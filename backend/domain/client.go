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
		return errors.New("firstName and lastName required")
	}
	if _, err := mail.ParseAddress(c.Email); err != nil {
		return errors.New("invalid email")
	}
	if len(c.DNI) != 10 {
		return errors.New("DNi doesn't have 10 digits")
	}
	if len(c.Phone) < 9 {
		return errors.New("invalid phone")
	}

	return nil
}
