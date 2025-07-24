package update_client

import (
	"errors"
	"POS/backend/database/sqlite"
	"POS/backend/domain"
	"POS/backend/database/models"
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
		RegistrationDate: req.RegistrationDate,
	}

	if err := client.Validate(); err != nil {
		return err
	}

	ormClient.FirstName = client.FirstName
	ormClient.LastName = client.LastName
	ormClient.Email = client.Email
	ormClient.Phone = client.Phone
	ormClient.DNI = client.DNI
	ormClient.RegistrationDate = client.RegistrationDate

	saveResult := db.Save(&ormClient)
	return saveResult.Error
}
