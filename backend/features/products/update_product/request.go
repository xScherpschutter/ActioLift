package update_product

type UpdateProductRequest struct {
	ID 			int 	 `json:"id"`
	Name 		string   `json:"name"`
	Price       float64  `json:"price"`
	Stock       int    	 `json:"stock"`
}