package models

import (
	"time"
)

type Client struct {
	ID               uint           `gorm:"primaryKey"`
	FirstName        string         `gorm:"not null"`
	LastName         string         `gorm:"not null"`
	Email            string         
	Phone            string
	DNI              string         
	RegistrationDate string      	`gorm:"not null"`
	CreatedAt        time.Time
	UpdatedAt        time.Time

	Subscriptions []Subscription `gorm:"foreignKey:ClientID"`
	Sales         []Sale         `gorm:"foreignKey:ClientID"`
}
