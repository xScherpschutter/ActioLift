package services

import (
	"POS/backend/domain"
)

func CalculateSale(head *domain.Sale, details []domain.SalesDetail) {
	var total float64
	for _, detail := range details {
		total += detail.Price * float64(detail.Quantity)
	}
	head.Total = total
}
