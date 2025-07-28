package save_sale

import (
	"POS/backend/database/models"
	"POS/backend/database/sqlite"
	"POS/backend/domain/services"
)

func SaveSale(req SaveSaleRequest) error {
	tx := sqlite.DB.Begin()

	var saleORM models.Sale
	saleORM.ClientID = uint(req.ClientID)

	if err := tx.Create(&saleORM).Error; err != nil {
		tx.Rollback()
		return err
	}

	domainSale := MapSaleRequestToDomain(req)
	detailsSale := MapDetailsRequestToDomain(req)
	services.CalculateSale(domainSale, detailsSale)
	saleORM.Total = domainSale.Total

	if err := tx.Save(&saleORM).Error; err != nil {
		tx.Rollback()
		return err
	}

	detailsORM := MapDetailsToModel(saleORM.ID, req.Details)
	if err := tx.Create(&detailsORM).Error; err != nil {
		tx.Rollback()
		return err
	}

	return tx.Commit().Error
}