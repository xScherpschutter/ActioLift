package save_product

type SaveProductHandler struct {}

func NewSaveProductHandler() SaveProductHandler {
	return SaveProductHandler{}
}

func (handler SaveProductHandler) Handle(req SaveProductRequest) error {
	return SaveProduct(req)
}