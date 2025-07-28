package save_sale

type SaveSaleHandler struct {}

func NewSaveSaleHandler() *SaveSaleHandler {
	return &SaveSaleHandler{}
}

func (h *SaveSaleHandler) Handle(req SaveSaleRequest) error {
	return SaveSale(req)
}
