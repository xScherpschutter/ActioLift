package save_client

import (
	"POS/backend/database/models"
	"POS/backend/database/sqlite"
	"POS/backend/domain"
	"POS/backend/infrastructure"
	"strconv"
)

func SaveClient(req SaveClientRequest) error {

    client := domain.Client{
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

    ormClient := mapRequestToClientModel(req)

    result := sqlite.DB.Create(&ormClient)

    infrastructure.NewActivityRepository().CreateActivity(models.ActivityLog{
        Entity:   "Client",
        EntityID: ormClient.ID,
        Action:   "Create",
        Summary:  "Cliente " + ormClient.FirstName + " " + ormClient.LastName + " (#" + strconv.FormatUint(uint64(ormClient.ID), 10) + ") creado",
    })
    
    return result.Error
}
