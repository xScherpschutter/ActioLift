package save_product

import (
	"POS/backend/database/models"
	"POS/backend/database/sqlite"
	"POS/backend/infrastructure"
)

func SaveProduct(req SaveProductRequest) error {
	ormProduct := mapRequestToProductModel(req)
	result := sqlite.DB.Create(&ormProduct)

	infrastructure.NewActivityRepository().CreateActivity(models.ActivityLog{
		Entity:   "Product",
		EntityID: ormProduct.ID,
		Action:   "Create",
		Summary:  "Producto " + ormProduct.Name + " guardado",
	})

	return result.Error
}