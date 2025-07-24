package save_product
import (
	"POS/backend/database/models"
)

func mapRequestToProductModel(req SaveProductRequest) models.Product {
	return models.Product{
		Name: 		 req.Name,
		Price:       req.Price,
		Stock:       req.Stock,
	}
}