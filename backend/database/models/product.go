package models

import (
	"time"
)

type Product struct {
	ID        uint           `gorm:"primaryKey"`
	Name      string         `gorm:"not null"`
	Price     float64        `gorm:"not null"`
	Stock     int            `gorm:"not null"`
	CreatedAt time.Time
	UpdatedAt time.Time

	SaleDetails []SalesDetail `gorm:"foreignKey:ProductID"`
}