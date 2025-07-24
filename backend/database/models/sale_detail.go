package models

type SalesDetail struct {
	ID        uint    `gorm:"primaryKey"`
	SaleID    uint    `gorm:"not null;index"`
	ProductID uint    `gorm:"not null;index"`
	Quantity  int     `gorm:"not null"`
	Price     float64 `gorm:"not null"`

	Sale    Sale    `gorm:"foreignKey:SaleID"`
	Product Product `gorm:"foreignKey:ProductID"`
}
