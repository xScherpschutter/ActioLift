package update_product

import (
	"errors"
	"POS/backend/database/sqlite"
	"POS/backend/database/models"
)

func UpdateProduct(req UpdateProductRequest) error {
	var ormProduct models.Product
	result := sqlite.DB.First(&ormProduct, req.ID)

	if result.Error != nil {
		return errors.New("product not found")
	}

	ormProduct.Name = req.Name
	ormProduct.Price = req.Price
	ormProduct.Stock = req.Stock

	savedResult := sqlite.DB.Save(&ormProduct)
	return savedResult.Error
}