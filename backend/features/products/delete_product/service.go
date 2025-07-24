package delete_product

import (
	"errors"
    "POS/backend/database/sqlite"  
    "POS/backend/database/models"
)


func DeleteProduct(req DeleteProductRequest) error {
	result := sqlite.DB.Delete(&models.Product{}, req.ID)

	if result.RowsAffected == 0 {
		return errors.New("product not found")
	}

	return result.Error
}