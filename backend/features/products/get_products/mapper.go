package get_products

import (
    "POS/backend/database/models"
)

func mapProductModelToResponse(p models.Product) ProductResponse {
    return ProductResponse{
		ID:		p.ID,
		Name: 	p.Name,
		Price:  p.Price,
		Stock: 	p.Stock,
	}
        
}

func mapProductModelListToResponse(products []models.Product) []ProductResponse {
    responses := make([]ProductResponse, len(products))
    for i, p := range products {
        responses[i] = mapProductModelToResponse(p)
    }
    return responses
}
