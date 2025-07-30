package delete_client

import (
	"POS/backend/database/models"
	"POS/backend/database/sqlite"
	"POS/backend/infrastructure"
	"errors"
	"strconv"
)

func DeleteClient(req DeleteClientRequest) error {
	var client models.Client
	result := sqlite.DB.Delete(&client, req.ID)

	if result.RowsAffected == 0 {
		return errors.New("client not found")
	}
	infrastructure.NewActivityRepository().CreateActivity(models.ActivityLog{
		Entity:   "Client",
		EntityID: req.ID,
		Action:   "Delete",
		Summary:  "Cliente " + client.FirstName + " " + client.LastName + " eliminado (#" + strconv.FormatUint(uint64(req.ID), 10) + ")",
	})

	return result.Error

}