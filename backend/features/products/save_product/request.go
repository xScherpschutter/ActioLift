package save_product

type SaveProductRequest struct {
	Name 		string   `json:"name"`  
	Price       float64  `json:"price"`
	Stock       int    	 `json:"stock"`
}