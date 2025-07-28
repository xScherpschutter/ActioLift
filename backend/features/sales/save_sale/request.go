package save_sale

type SaveSaleRequest struct {
	ClientID int `json:"client_id"`
	Details []ProductItem `json:"details"`
}

type ProductItem struct {
	ProductID int `json:"product_id"`
	Quantity int `json:"quantity"`
	Price float64 `json:"price"`
}