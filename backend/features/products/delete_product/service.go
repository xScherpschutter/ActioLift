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
	if err := sqlite.DB.First(&product, req.ID).Error; err != nil {
		return errors.New("product not found")
	}

	result := sqlite.DB.Delete(&product)

	if result.RowsAffected == 0 {
		return errors.New("product not found")
	}

	infrastructure.NewActivityRepository().CreateActivity(models.ActivityLog{
		Entity:   "Product",
		EntityID: req.ID,
		Action:   "Delete",
		Summary:  "Producto " + product.Name + " (#" + strconv.FormatUint(uint64(req.ID), 10) + ") eliminado",
	})

	return result.Error
}