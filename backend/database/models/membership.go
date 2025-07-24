package models

import (
	"time"
)

type Membership struct {
	ID          uint           `gorm:"primaryKey"`
	Name        string         `gorm:"not null"`
	Description string
	Price       float64        `gorm:"not null"`
	Duration    int            `gorm:"not null"`
	CreatedAt   time.Time
	UpdatedAt   time.Time

	Subscriptions []Subscription `gorm:"foreignKey:MembershipID"`
}
