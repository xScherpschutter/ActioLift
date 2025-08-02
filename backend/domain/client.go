package domain

import (
	"errors"
	"net/mail"
)

type Client struct {
	ID               uint
	FirstName        string
	LastName         string
	Email            string
	Phone            string
	DNI              string
	RegistrationDate string
}

func (c *Client) Validate() error {
	if c.FirstName == "" || c.LastName == "" {
		return errors.New("el nombre y apellido son obligatorios")
	}
	if c.Email != "" {
		if _, err := mail.ParseAddress(c.Email); err != nil {
			return errors.New("el email no es válido")
		}
	}
	if c.DNI != "" {
		if len(c.DNI) != 10 {
			return errors.New("el DNI debe tener 10 dígitos")
		}
	}
	if c.Phone != "" {
		if len(c.Phone) < 9 {
			return errors.New("el teléfono no es válido")
		}
		for _, char := range c.Phone {
			if char < '0' || char > '9' {
				return errors.New("el teléfono debe contener solo números")
			}
		}
	}

	return nil
}
