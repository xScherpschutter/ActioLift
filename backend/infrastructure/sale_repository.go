package infrastructure

import (
	"POS/backend/database/models"
	"POS/backend/domain"
	"gorm.io/gorm"
)

type SaleRepository struct {
	db *gorm.DB
}

func NewSaleRepository(db *gorm.DB) *SaleRepository {
	return &SaleRepository{db: db}
}

func (r *SaleRepository) SaveSale(sale *domain.Sale) (uint, error) {
	tx := r.db.Begin()

	var saleORM models.Sale
	saleORM.ClientID = uint(sale.ClientID)

	if err := tx.Create(&saleORM).Error; err != nil {
		tx.Rollback()
		return 0, err
	}
	saleORM.Total = sale.Total

	if err := tx.Save(&saleORM).Error; err != nil {
		tx.Rollback()
		return 0, err
	}

	return saleORM.ID, tx.Commit().Error
}

func (r *SaleRepository) SaveSaleDetails(details []models.SalesDetail) error {
	tx := r.db.Begin()

	if err := tx.Create(details).Error; err != nil {
		tx.Rollback()
		return err
	}

	return tx.Commit().Error
}

func (r *SaleRepository) UpdateSale(sale *models.Sale) error {
	tx := r.db.Begin()

	if err := tx.Save(sale).Error; err != nil {
		tx.Rollback()
		return err
	}

	return tx.Commit().Error
}

func (r *SaleRepository) UpdateSaleDetails(details []models.SalesDetail) error {
	tx := r.db.Begin()

	if err := tx.Create(details).Error; err != nil {
		tx.Rollback()
		return err
	}

	return tx.Commit().Error
}

func (r *SaleRepository) GetSaleDetails(saleID uint) ([]models.SalesDetail, error) {
	var details []models.SalesDetail
	if err := r.db.Where("sale_id = ?", saleID).Find(&details).Error; err != nil {
		return nil, err
	}
	return details, nil
}

func (r *SaleRepository) DeleteSaleDetails(saleID uint) error {
	tx := r.db.Begin()

	if err := tx.Where("sale_id = ?", saleID).Delete(&models.SalesDetail{}).Error; err != nil {
		tx.Rollback()
		return err
	}

	return tx.Commit().Error
}
