package get_sales

type SalesResponse struct {
	ID         uint                  `json:"id"`
	ClientID   uint                  `json:"client_id"`
	ClientName string                `json:"client_name"`
	Date       string                `json:"date"`
	Total      float64              `json:"total"`
	Details    []SalesDetailResponse `json:"details" gorm:"-"`
}

type SalesDetailResponse struct {
	SaleID     uint    `json:"sale_id"`
	ProductID  uint    `json:"product_id"`
	ProductName string  `json:"product_name"`
	Quantity   int     `json:"quantity"`
	Price      float64 `json:"price"`
}
