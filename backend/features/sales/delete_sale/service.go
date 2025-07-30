package delete_sale

import (
	"POS/backend/database/models"
	"POS/backend/database/sqlite"
	"POS/backend/infrastructure"
	"errors"
	"strconv"
)

func DeleteSale(req DeleteSaleRequest) error {
	result := sqlite.DB.Delete(&models.Sale{}, req.ID)
	if result.RowsAffected == 0 {
		return errors.New("sale not found")
	}

	infrastructure.NewActivityRepository().CreateActivity(models.ActivityLog{
		Entity:    "Sale",
		EntityID:  req.ID,
		Action:    "Delete",
		Summary:   "Venta #" + strconv.FormatUint(uint64(req.ID), 10) + " eliminada",
	})

	return result.Error
}