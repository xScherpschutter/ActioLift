package get_products

import (
	"POS/backend/database/models"
	"POS/backend/database/sqlite"
	"errors"
)

func GetAllProducts() ([]ProductResponse, error) {
	var products []models.Product
	
	result := sqlite.DB.Find(&products)
	if result.Error != nil {
		return nil, errors.New("no se pudo obtener los productos")
	}
	
	return mapProductModelListToResponse(products), nil
}