package save_product

import (
	"POS/backend/database/sqlite"
)

func SaveProduct(req SaveProductRequest) error {
	ormProduct := mapRequestToProductModel(req)
	result := sqlite.DB.Create(&ormProduct)
	return result.Error
}