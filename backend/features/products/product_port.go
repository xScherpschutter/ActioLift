package products

type ProductRepository interface {
    ValidateStock(id string, quantity int) error
    DecreaseStock(id string, quantity int) error
    IncreaseStock(id string, quantity int) error
}