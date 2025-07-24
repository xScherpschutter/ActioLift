package models

type Subscription struct {
	ID           uint      `gorm:"primaryKey"`
	ClientID     uint      `gorm:"not null;index"`
	MembershipID uint      `gorm:"not null;index"`
	StartDate    string    `gorm:"not null"`
	EndDate      string    `gorm:"not null"`

	Client     Client     `gorm:"foreignKey:ClientID"`
	Membership Membership `gorm:"foreignKey:MembershipID"`
}
