package delete_product

type DeleteProductHandler struct{}

func NewDeleteProductHandler() *DeleteProductHandler {
	return &DeleteProductHandler{}
}

func (h *DeleteProductHandler) Handle(req DeleteProductRequest) error {
	return DeleteProduct(req)
}