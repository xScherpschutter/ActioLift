package get_products

import (
    "POS/backend/database/sqlite"  
    "POS/backend/database/models"
)

func GetAllProducts() ([]ProductResponse, error) {
	var products []models.Product
	
	result := sqlite.DB.Find(&products)
	if result.Error != nil {
		return nil, result.Error
	}
	
	return mapProductModelListToResponse(products), nil
}