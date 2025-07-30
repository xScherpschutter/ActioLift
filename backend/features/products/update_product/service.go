package update_product

import (
	"POS/backend/database/models"
	"POS/backend/database/sqlite"
	"POS/backend/infrastructure"
	"errors"
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

	infrastructure.NewActivityRepository().CreateActivity(models.ActivityLog{
		Entity:   "Product",
		EntityID: ormProduct.ID,
		Action:   "Update",
		Summary:  "Producto " + ormProduct.Name + " actualizado",
	})

	return savedResult.Error
}