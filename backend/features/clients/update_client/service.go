package update_client

import (
	"POS/backend/database/models"
	"POS/backend/database/sqlite"
	"POS/backend/domain"
	"POS/backend/infrastructure"
	"errors"
	"strconv"
)

func UpdateClient(req UpdateClientRequest) error {
	db := sqlite.DB

	var ormClient models.Client

	result := db.First(&ormClient, req.ID)
	if result.Error != nil {
		return errors.New("client not found")
	}

	client := domain.Client{
		ID:               ormClient.ID,
		FirstName:        req.FirstName,
		LastName:         req.LastName,
		Email:            req.Email,
		Phone:            req.Phone,
		DNI:              req.DNI,
	}

	if err := client.Validate(); err != nil {
		return err
	}

	ormClient.FirstName = client.FirstName
	ormClient.LastName = client.LastName
	ormClient.Email = client.Email
	ormClient.Phone = client.Phone
	ormClient.DNI = client.DNI

	saveResult := db.Save(&ormClient)

	infrastructure.NewActivityRepository().CreateActivity(models.ActivityLog{
		Entity:   "Client",
		EntityID: ormClient.ID,
		Action:   "Update",
		Summary:  "Cliente " + ormClient.FirstName + " " + ormClient.LastName + " (#" + strconv.FormatUint(uint64(ormClient.ID), 10) + ") actualizado",
	})

	return saveResult.Error
}
