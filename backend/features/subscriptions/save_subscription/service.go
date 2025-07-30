package save_subscription

import (
	"POS/backend/database/models"
	"POS/backend/database/sqlite"
	"POS/backend/domain"
	"POS/backend/infrastructure"
	"strconv"
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

	infrastructure.NewActivityRepository().CreateActivity(models.ActivityLog{
		Entity:    "Subscription",
		EntityID:  ormSubscription.ID,
		Action:    "Create",
		Summary:   "Suscripción #" + strconv.FormatUint(uint64(ormSubscription.ID), 10) + " creada",
	})

	return result.Error
}
