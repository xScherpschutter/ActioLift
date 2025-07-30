package update_sale

type UpdateSaleRequest struct {
	ID uint `json:"id"`
	ClientID uint `json:"client_id"`
	Details []ProductItem `json:"details"`
}

type ProductItem struct {
	ID uint `json:"id,omitempty"`
	ProductID uint `json:"product_id"`
	Quantity int `json:"quantity"`
	Price float64 `json:"price"`
}