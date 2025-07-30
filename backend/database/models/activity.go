package models

import (
	"time"
)

type ActivityLog struct {
	ID         uint      `gorm:"primaryKey"`
	Entity     string    `gorm:"not null"`                 // Ej: "Client", "Sale", "Product", etc.
	EntityID   uint      `gorm:"not null"`                 // ID del registro afectado
	Action     string    `gorm:"not null"`                 // "CREATE", "UPDATE", "DELETE"
	Summary    string    `gorm:"size:255"`                 // Texto breve: "Se registró una nueva venta por $45.00"
	CreatedAt  time.Time
}