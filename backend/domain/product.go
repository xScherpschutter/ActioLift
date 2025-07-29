package domain

import "errors"

type Product struct {
	ID    uint
	Name  string
	Price float64
	Stock int
}

func (p *Product) ValidateStock(quantity int) error {
	if p.Stock < quantity {
		return errors.New("stock is not enough")
	}
	return nil
}
