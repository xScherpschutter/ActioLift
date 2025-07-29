package delete_sale

import (
	"POS/backend/database/models"
	"POS/backend/database/sqlite"
	"errors"
)

func DeleteSale(req DeleteSaleRequest) error {
	result := sqlite.DB.Delete(&models.Sale{}, req.ID)
	if result.RowsAffected == 0 {
		return errors.New("sale not found")
	}
	return result.Error
}