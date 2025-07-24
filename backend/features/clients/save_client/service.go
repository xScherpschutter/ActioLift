package save_client

import (
    "POS/backend/database/sqlite"
    "POS/backend/domain"
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
    
    return result.Error
}
