package models

import (
	"time"
)

type Subscription struct {
	ID           uint      `gorm:"primaryKey"`
	ClientID     uint      `gorm:"not null;index"`
	MembershipID uint      `gorm:"not null;index"`
	Price        float64   `gorm:"not null"`
	StartDate    string    `gorm:"not null"`
	EndDate      string    `gorm:"not null"`
	CreatedAt   time.Time
	UpdatedAt   time.Time

	Client     Client     `gorm:"foreignKey:ClientID"`
	Membership Membership `gorm:"foreignKey:MembershipID"`
}
