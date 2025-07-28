package save_sale

import (
	"POS/backend/database/models"
	"POS/backend/domain"
)

func MapSaleRequestToDomain(req SaveSaleRequest) *domain.Sale {
	return &domain.Sale{
		ClientID: uint(req.ClientID),
		Total:    0,
	}
}

func MapDetailsRequestToDomain(req SaveSaleRequest) []domain.SalesDetail {
	var domainDetails []domain.SalesDetail
	for _, detail := range req.Details {
		domainDetails = append(domainDetails, domain.SalesDetail{
			ProductID: uint(detail.ProductID),
			Quantity:  int(detail.Quantity),
			Price:     float64(detail.Price),
		})
	}
	return domainDetails
}

func MapDetailsToModel(sale_id uint, details []ProductItem) []models.SalesDetail {
	var modelDetails []models.SalesDetail
	for _, detail := range details {
		modelDetails = append(modelDetails, models.SalesDetail{
			SaleID:    sale_id,
			ProductID: uint(detail.ProductID),
			Quantity:  int(detail.Quantity),
			Price:     float64(detail.Price),
		})
	}
	return modelDetails
}