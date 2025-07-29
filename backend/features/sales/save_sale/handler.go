package save_sale

import (
	"POS/backend/database/sqlite"
	"POS/backend/infrastructure"

)

type SaveSaleHandler struct {
	Service *SaveSaleService
}

func NewSaveSaleHandler() *SaveSaleHandler {
	var handler SaveSaleHandler
	service := NewSaveSaleService(
		infrastructure.NewSaleRepository(sqlite.DB),
		infrastructure.NewProductRepository(sqlite.DB),
	)
	handler.Service = service
	return &handler
}

func (h *SaveSaleHandler) Handle(req SaveSaleRequest) error {
    return h.Service.Save(req)
}
