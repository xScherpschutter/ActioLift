package get_products

type GetAllProductsHandler struct {}

func NewGetAllProductsHandler() *GetAllProductsHandler {
	return &GetAllProductsHandler{}
}

func (h *GetAllProductsHandler) Handle() ([]ProductResponse, error){
	return GetAllProducts()
}