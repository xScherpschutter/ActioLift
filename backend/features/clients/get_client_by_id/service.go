package get_client_by_id


import (
	"errors"
	"POS/backend/database/sqlite"
	"POS/backend/database/models"
)

func GetClientByID(q GetClientByIDQuery) (ClientResponse, error) {
	
	var clientModel models.Client
	result := sqlite.DB.Find(&clientModel, q.ID)

	if result.Error != nil {
		return ClientResponse{}, result.Error
	}
	
	if result.RowsAffected == 0 {
		return ClientResponse{}, errors.New("client not found")
	}

	return ClientResponse{
		ID:        clientModel.ID,
		FirstName: clientModel.FirstName,
		LastName:  clientModel.LastName,
		Email:     clientModel.Email,
		Phone:     clientModel.Phone,
		DNI:       clientModel.DNI,
	}, nil
}
