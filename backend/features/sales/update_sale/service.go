package update_sale

import (
	"POS/backend/database/models"
	"POS/backend/domain"
	"POS/backend/domain/services"
	"POS/backend/features/products"
	"POS/backend/infrastructure"
	"fmt"
	"strconv"
)

type UpdateSaleService struct {
	SaleRepo    UpdateSalePort
	ProductRepo products.ProductRepository
}

func NewUpdateSaleService(saleRepo UpdateSalePort, productRepo products.ProductRepository) *UpdateSaleService {
	return &UpdateSaleService{
		SaleRepo:    saleRepo,
		ProductRepo: productRepo,
	}
}

func (s *UpdateSaleService) UpdateSale(req UpdateSaleRequest) error {
	// 1. Obtener detalles actuales
	currentDetails, err := s.SaleRepo.GetSaleDetails(req.ID)
	if err != nil {
		return fmt.Errorf("error al obtener detalles actuales: %w", err)
	}

	// 2. Indexar detalles actuales y nuevos
	currentMap := make(map[uint]models.SalesDetail)
	for _, detail := range currentDetails {
		currentMap[detail.ID] = detail
	}

	newMap := make(map[uint]ProductItem)
	for _, detail := range req.Details {
		if detail.ID > 0 {
			newMap[detail.ID] = detail
		}
	}

	// 3. Procesar detalles eliminados
	for id, current := range currentMap {
		if _, exists := newMap[id]; !exists {
			s.increaseStock(current.ProductID, current.Quantity)
		}
	}

	// 4. Procesar detalles nuevos y editados
	var newDetails []models.SalesDetail
	for _, detail := range req.Details {
		if detail.ID > 0 {
			// Detalle editado
			if current, exists := currentMap[detail.ID]; exists {
				s.adjustStockForEdit(current, detail)
			}
		} else {
			// Detalle nuevo
			s.decreaseStock(detail.ProductID, detail.Quantity)
		}

		newDetails = append(newDetails, models.SalesDetail{
			ID:        detail.ID,
			SaleID:    req.ID,
			ProductID: detail.ProductID,
			Quantity:  detail.Quantity,
			Price:     detail.Price,
		})
	}

	// 5. Actualizar en BD
	if err := s.SaleRepo.DeleteSaleDetails(req.ID); err != nil {
		return fmt.Errorf("error al eliminar detalles: %w", err)
	}
    sale := &models.Sale{
        ID: req.ID,
        ClientID: req.ClientID,
        Total: 0,
    }

    detailsDomain := make([]domain.SalesDetail, 0)
    for _, detail := range newDetails {
        detailsDomain = append(detailsDomain, domain.SalesDetail{
            ID:        detail.ID,
            SaleID:    detail.SaleID,
            ProductID: detail.ProductID,
            Quantity:  detail.Quantity,
            Price:     detail.Price,
        })
    }
    var saleDomain = &domain.Sale{
        ID:       sale.ID,
        ClientID: sale.ClientID,
        Total:    sale.Total,
    }


    // 6. Calcular el nuevo total
    services.CalculateSale(saleDomain, detailsDomain)
    sale.Total = saleDomain.Total
    
	if err := s.SaleRepo.UpdateSale(sale); err != nil {
		return fmt.Errorf("error al actualizar venta: %w", err)
	}
	if err := s.SaleRepo.UpdateSaleDetails(newDetails); err != nil {
		return fmt.Errorf("error al guardar detalles: %w", err)
	}

    infrastructure.NewActivityRepository().CreateActivity(models.ActivityLog{
        Entity:    "Sale",
        EntityID:  req.ID,
        Action:    "Update",
        Summary:   "Venta #" + strconv.FormatUint(uint64(req.ID), 10) + " actualizada",
    })

	return nil
}

func (s *UpdateSaleService) adjustStockForEdit(current models.SalesDetail, new ProductItem) {
	if current.ProductID != new.ProductID {
		// Cambió producto: devolver stock del anterior y quitar del nuevo
		s.increaseStock(current.ProductID, current.Quantity)
		s.decreaseStock(new.ProductID, new.Quantity)
	} else if current.Quantity != new.Quantity {
		// Mismo producto, cantidad diferente
		diff := new.Quantity - current.Quantity
		if diff > 0 {
			s.decreaseStock(current.ProductID, diff)
		} else {
			s.increaseStock(current.ProductID, -diff)
		}
	}
}

func (s *UpdateSaleService) increaseStock(productID uint, quantity int) {
	id := strconv.FormatUint(uint64(productID), 10)
	s.ProductRepo.IncreaseStock(id, quantity)
}

func (s *UpdateSaleService) decreaseStock(productID uint, quantity int) {
	id := strconv.FormatUint(uint64(productID), 10)
	s.ProductRepo.DecreaseStock(id, quantity)
}