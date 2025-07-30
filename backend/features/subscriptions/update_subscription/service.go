package update_subscription

import (
	"POS/backend/database/models"
	"POS/backend/database/sqlite"
	"POS/backend/domain"
	"POS/backend/infrastructure"
	"errors"
	"strconv"
)

func UpdateSubscription(req UpdateSubscriptionRequest) error {
	subscription := domain.Subscription {
		ID: req.ID,
		MembershipID: req.MembershipID,
		ClientID: req.ClientID,
		StartDate: req.StartDate,
		EndDate: req.EndDate,
	}

	err := subscription.Validate()
	if err != nil {
		return err
	}

	var ormSubscription models.Subscription
	result := sqlite.DB.Find(&ormSubscription, req.ID)

	if result.Error != nil {
		return errors.New("subscription not found")
	}
	
	ormSubscription.MembershipID = subscription.MembershipID
	ormSubscription.ClientID = subscription.ClientID
	ormSubscription.StartDate = subscription.StartDate
	ormSubscription.EndDate = subscription.EndDate
	saveResult := sqlite.DB.Save(&ormSubscription)

	infrastructure.NewActivityRepository().CreateActivity(models.ActivityLog{
		Entity:    "Subscription",
		EntityID:  ormSubscription.ID,
		Action:    "Update",
		Summary:   "Suscripción #" + strconv.FormatUint(uint64(ormSubscription.ID), 10) + " actualizada",
	})

	return saveResult.Error
}