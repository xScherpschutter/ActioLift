package get_clients

import (
    "POS/backend/database/models"
)

func mapClientModelToResponse(m models.Client) ClientResponse {
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

func mapClientModelListToResponse(clients []models.Client) []ClientResponse {
    responses := make([]ClientResponse, len(clients))
    for i, c := range clients {
        responses[i] = mapClientModelToResponse(c)
    }
    return responses
}
