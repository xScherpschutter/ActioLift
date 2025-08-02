package save_product

import (
	"POS/backend/database/models"
	"POS/backend/database/sqlite"
	"POS/backend/infrastructure"
	"errors"
)

func SaveProduct(req SaveProductRequest) error {
	ormProduct := mapRequestToProductModel(req)
	result := sqlite.DB.Create(&ormProduct)
	if result.Error != nil {
		return errors.New("no se pudo guardar el producto")
	}

	infrastructure.NewActivityRepository().CreateActivity(models.ActivityLog{
		Entity:   "Product",
		EntityID: ormProduct.ID,
		Action:   "Create",
		Summary:  "Producto " + ormProduct.Name + " guardado",
	})

	return nil
}