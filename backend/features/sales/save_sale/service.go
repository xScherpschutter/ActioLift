package save_sale

import (
	"POS/backend/database/models"
	"POS/backend/domain/services"
	"POS/backend/features/products"
	"POS/backend/infrastructure"
	"errors"
	"strconv"
)

type SaveSaleService struct {
    SaleRepo    SaleRepository
    ProductRepo products.ProductRepository
}

func NewSaveSaleService(saleRepo SaleRepository, productRepo products.ProductRepository) *SaveSaleService {
    return &SaveSaleService{
        SaleRepo:    saleRepo,
        ProductRepo: productRepo,
    }
}

func (s *SaveSaleService) Save(req SaveSaleRequest) error {
	sale := MapSaleRequestToDomain(req)
    details := MapDetailsRequestToDomain(req)
    for _, detail := range details {
        if err := s.ProductRepo.ValidateStock(strconv.FormatUint(uint64(detail.ProductID), 10), detail.Quantity); err != nil {
            return errors.New("no se pudo guardar la venta: " + err.Error())
        }
    }
	// Calcular total
    services.CalculateSale(sale, details)
    // Guardar cabecera de venta
    saleID, err := s.SaleRepo.SaveSale(sale)
    if err != nil {
        return errors.New("no se pudo guardar la venta: " + err.Error())
    }
	// Guardar detalles de la venta
	detailsModel := MapDetailsToModel(saleID, details)
	err = s.SaleRepo.SaveSaleDetails(detailsModel)
	if err != nil {
		return err
	}
    // Reducir stock
    for _, detail := range details {
        if err := s.ProductRepo.DecreaseStock(strconv.FormatUint(uint64(detail.ProductID), 10), detail.Quantity); err != nil {
            return errors.New("no se pudo guardar la venta: " + err.Error())
        }
    }

    infrastructure.NewActivityRepository().CreateActivity(models.ActivityLog{
        Entity:    "Sale",
        EntityID:  saleID,
        Action:    "Create",
        Summary:   "Venta #" + strconv.FormatUint(uint64(saleID), 10) + " guardada",
    })

    return nil
}
