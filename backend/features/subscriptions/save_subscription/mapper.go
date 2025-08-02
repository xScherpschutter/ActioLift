package save_subscription

import (
	"POS/backend/database/models"
	"POS/backend/domain"
)

func MapSubscriptionDomainToModel(m domain.Subscription) models.Subscription {
	return models.Subscription{
			ClientID:     m.ClientID,
			MembershipID: m.MembershipID,
			Price:        m.Price,
			StartDate:    m.StartDate,
			EndDate:      m.EndDate,
	}
}