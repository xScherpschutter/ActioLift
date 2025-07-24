package save_client

import (
    "POS/backend/database/models"
)

func mapRequestToClientModel(req SaveClientRequest) models.Client {
    return models.Client{
        FirstName:        req.FirstName,
        LastName:         req.LastName,
        Email:            req.Email,
        Phone:            req.Phone,
        DNI:              req.DNI,
        RegistrationDate: req.RegistrationDate,
    }
}