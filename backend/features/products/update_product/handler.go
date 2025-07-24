package update_product

type UpdateProductHandler struct {}

func NewUpdateProductHandler() *UpdateProductHandler {
	return &UpdateProductHandler{}
}

func (h *UpdateProductHandler) Handle(req UpdateProductRequest) error {
	return UpdateProduct(req)
}