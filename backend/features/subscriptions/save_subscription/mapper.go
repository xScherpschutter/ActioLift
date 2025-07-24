package save_subscription

import (
	"POS/backend/database/models"
)

func MapSaveSubscriptionRequestToModel(req SaveSubscriptionRequest) models.Subscription {
	return models.Subscription{
		ClientID:     req.ClientID,
		MembershipID: req.MembershipID,
		StartDate:    req.StartDate,
		EndDate:      req.EndDate,
	}
}