package update_sale

import (
	"POS/backend/database/models"
)

type UpdateSalePort interface {
	GetSaleDetails(saleID uint) ([]models.SalesDetail, error)
	UpdateSale(sale *models.Sale) error
	UpdateSaleDetails(details []models.SalesDetail) error
	DeleteSaleDetails(saleID uint) error
}
