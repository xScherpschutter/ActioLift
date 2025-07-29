package infrastructure

import (
	"POS/backend/database/models"
	"POS/backend/domain"
	"gorm.io/gorm"
)

type ProductRepository struct {
    db *gorm.DB
}

func NewProductRepository(db *gorm.DB) *ProductRepository {
    return &ProductRepository{db: db}
}

func (r *ProductRepository) ValidateStock(id string, quantity int) error {
	var product models.Product
	var domainProduct domain.Product

	if err := r.db.First(&product, "id = ?", id).Error; err != nil {
		return err
	}
	
	domainProduct = domain.Product{
		ID:    product.ID,
		Name:  product.Name,
		Price: product.Price,
		Stock: product.Stock,
	}
	return domainProduct.ValidateStock(quantity)
}

func (r *ProductRepository) DecreaseStock(id string, quantity int) error {
    var product models.Product
    if err := r.db.First(&product, "id = ?", id).Error; err != nil {
        return err
    }
    product.Stock -= quantity
    return r.db.Save(&product).Error
}

func (r *ProductRepository) IncreaseStock(id string, quantity int) error {
    var product models.Product
    if err := r.db.First(&product, "id = ?", id).Error; err != nil {
        return err
    }
    product.Stock += quantity
    return r.db.Save(&product).Error
}
