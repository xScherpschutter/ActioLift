package models

type Attendance struct {
	ID       uint      `gorm:"primaryKey"`
	ClientID uint      `gorm:"not null;index"`
	Date     string	   `gorm:"not null"`

	Client Client `gorm:"foreignKey:ClientID"`
}
