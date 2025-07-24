package save_subscription

import (
	"POS/backend/database/sqlite"
	"POS/backend/domain"
)

func SaveSubscription(req SaveSubscriptionRequest) error {

	subscription := domain.Subscription {
		ClientID:     req.ClientID,
		MembershipID: req.MembershipID,
		StartDate:    req.StartDate,
		EndDate:      req.EndDate,
	}
	
	err := subscription.Validate()
	if err != nil {
		return err
	}

	ormSubscription := MapSaveSubscriptionRequestToModel(req)
	result := sqlite.DB.Create(&ormSubscription)
	return result.Error
}
