package delete_client

import (
	"errors"
	"POS/backend/database/sqlite"
	"POS/backend/database/models"
)

func DeleteClient(req DeleteClientRequest) error {

	result := sqlite.DB.Delete(&models.Client{}, req.ID)

	if result.RowsAffected == 0 {
		return errors.New("client not found")
	}

	return result.Error

}