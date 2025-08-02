package domain

import (
	"errors"
	"time"

)

type Subscription struct {
	ID           uint
	ClientID     uint
	MembershipID uint
	Price        float64
	StartDate    string
	EndDate      string
}

func (s *Subscription) Validate() error {
	layout := "2006-01-02"

	startDate, err := time.Parse(layout, s.StartDate)
	if err != nil {
		return errors.New("formato de fecha de inicio inválido")
	}

	endDate, err := time.Parse(layout, s.EndDate)
	if err != nil {
		return errors.New("formato de fecha de fin inválido")
	}

	if startDate.After(endDate) {
		return errors.New("la fecha de inicio debe ser anterior a la fecha de fin")
	}

	return nil
}


