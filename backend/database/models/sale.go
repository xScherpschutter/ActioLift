package models

import (
	"time"
)

type Sale struct {
	ID        uint           `gorm:"primaryKey"`
	ClientID  uint           `gorm:"not null;index"`
	Total     float64        `gorm:"not null"`
	
	CreatedAt time.Time
	UpdatedAt time.Time

	Client      Client         `gorm:"foreignKey:ClientID"`
	SaleDetails []SalesDetail  `gorm:"foreignKey:SaleID;constraint:OnDelete:CASCADE"`
}
