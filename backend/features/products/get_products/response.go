package get_products

type ProductResponse struct {
	ID uint 		`json:"id"`
	Name  string	`json:"name"`
	Price float64 	`json:"price"`
	Stock int 		`json:"stock"`
}