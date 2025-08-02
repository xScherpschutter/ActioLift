package delete_product

import (
	"POS/backend/database/models"
	"POS/backend/database/sqlite"
	"POS/backend/infrastructure"
	"errors"
	"strconv"
)

func DeleteProduct(req DeleteProductRequest) error {
	var product models.Product
	result := sqlite.DB.First(&product, req.ID)
	
	if result.Error != nil {
		return errors.New("no se encontró el producto")
	}

	result = sqlite.DB.Delete(&product, req.ID)

	if result.RowsAffected == 0 {
		return errors.New("no se encontró el producto")
	}

	infrastructure.NewActivityRepository().CreateActivity(models.ActivityLog{
		Entity:   "Product",
		EntityID: req.ID,
		Action:   "Delete",
		Summary:  "Producto " + product.Name + " (#" + strconv.FormatUint(uint64(req.ID), 10) + ") eliminado",
	})

	return nil
}