package save_sale

import (
	"POS/backend/domain/services"
	"POS/backend/features/products"
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
            return err
        }
    }
	// Calcular total
    services.CalculateSale(sale, details)
    // Guardar cabecera de venta
    saleID, err := s.SaleRepo.SaveSale(sale)
    if err != nil {
        return err
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
            return err
        }
    }
    return nil
}
