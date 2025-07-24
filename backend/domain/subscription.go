package domain

import (
	"errors"
	"time"

)

type Subscription struct {
	ID           uint
	ClientID     uint
	MembershipID uint
	StartDate    string
	EndDate      string
}

func (s *Subscription) Validate() error {
	layout := "2006-01-02"

	startDate, err := time.Parse(layout, s.StartDate)
	if err != nil {
		return errors.New("invalid start date format")
	}

	endDate, err := time.Parse(layout, s.EndDate)
	if err != nil {
		return errors.New("invalid end date format")
	}

	if startDate.After(endDate) {
		return errors.New("start date must be before end date")
	}

	return nil
}


