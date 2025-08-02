package get_clients

import (
    "POS/backend/database/sqlite"  
    "POS/backend/database/models"
	"errors"
)

func GetAllClients() ([]ClientResponse, error) {
    var clients []models.Client
    result := sqlite.DB.Find(&clients)

    if result.Error != nil {
        return nil, errors.New("no se encontraron clientes")
    }

    return MapClientModelListToResponse(clients), nil
}
