package get_clients

import (
    "POS/backend/database/sqlite"  
    "POS/backend/database/models"
)

func GetAllClients() ([]ClientResponse, error) {
    var clients []models.Client
    result := sqlite.DB.Find(&clients)
    if result.Error != nil {
        return nil, result.Error
    }

    return mapClientModelListToResponse(clients), nil
}
