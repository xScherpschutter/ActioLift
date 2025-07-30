package update_sale

import (
	"POS/backend/database/sqlite"
	"POS/backend/infrastructure"
)

type UpdateSaleHandler struct {
	Service *UpdateSaleService
}

func NewUpdateSaleHandler() *UpdateSaleHandler {
	var handler UpdateSaleHandler
	service := NewUpdateSaleService(
		infrastructure.NewSaleRepository(sqlite.DB),
		infrastructure.NewProductRepository(sqlite.DB),
	)
	handler.Service = service
	return &handler
}

func (h *UpdateSaleHandler) Handle(req UpdateSaleRequest) error {
	return h.Service.UpdateSale(req)
}