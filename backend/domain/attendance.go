package domain

import "time"

type Attendance struct {
	ID       uint
	ClientID uint
	Date     time.Time
}
