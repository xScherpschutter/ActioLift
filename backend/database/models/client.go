package models

import (
	"time"
)

type Client struct {
	ID               uint           `gorm:"primaryKey"`
	FirstName        string         `gorm:"not null"`
	LastName         string         `gorm:"not null"`
	Email            string         `gorm:"uniqueIndex;not null"`
	Phone            string
	DNI              string         `gorm:"uniqueIndex;not null"`
	RegistrationDate string      	`gorm:"not null"`
	CreatedAt        time.Time
	UpdatedAt        time.Time

	Subscriptions []Subscription `gorm:"foreignKey:ClientID"`
	Sales         []Sale         `gorm:"foreignKey:ClientID"`
	Attendances   []Attendance   `gorm:"foreignKey:ClientID"`
}
