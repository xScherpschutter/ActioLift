package delete_sale

type DeleteSaleHandler struct {}

func NewDeleteSaleHandler () *DeleteSaleHandler {
	return &DeleteSaleHandler{}
} 

func (h *DeleteSaleHandler) Handle(req DeleteSaleRequest) error {
	return DeleteSale(req)
}