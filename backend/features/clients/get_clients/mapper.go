package get_clients

import (
    "POS/backend/database/models"
)

func MapClientModelToResponse(m models.Client) ClientResponse {
    return ClientResponse{
        ID:               m.ID,
        FirstName:        m.FirstName,
        LastName:         m.LastName,
        Email:            m.Email,
        Phone:            m.Phone,
        DNI:              m.DNI,
        RegistrationDate: m.RegistrationDate,
    }
}

func MapClientModelListToResponse(clients []models.Client) []ClientResponse {
    responses := make([]ClientResponse, len(clients))
    for i, c := range clients {
        responses[i] = MapClientModelToResponse(c)
    }
    return responses
}
