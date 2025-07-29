package save_sale

import (
	"POS/backend/database/models"
	"POS/backend/domain"
)

type SaleRepository interface {
	SaveSale(sale *domain.Sale) (uint, error)
	SaveSaleDetails(details []models.SalesDetail) error
}