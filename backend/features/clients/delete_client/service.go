package delete_client

import (
	"POS/backend/database/models"
	"POS/backend/database/sqlite"
	"POS/backend/infrastructure"
	"strconv"
	"errors"
)

func DeleteClient(req DeleteClientRequest) error {
	var client models.Client

	result := sqlite.DB.First(&client, req.ID)
	if result.Error != nil {
		return errors.New("no se encontró el cliente")
	}

	result = sqlite.DB.Delete(&client, req.ID)

	if result.RowsAffected == 0 {
		return errors.New("no se encontró el cliente")
	}
	
	infrastructure.NewActivityRepository().CreateActivity(models.ActivityLog{
		Entity:   "Client",
		EntityID: req.ID,
		Action:   "Delete",
		Summary:  "Cliente " + client.FirstName + " " + client.LastName + " eliminado (#" + strconv.FormatUint(uint64(req.ID), 10) + ")",
	})

	return nil

}