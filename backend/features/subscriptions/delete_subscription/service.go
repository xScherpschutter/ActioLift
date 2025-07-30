package delete_subscription

import (
	"POS/backend/database/models"
	"POS/backend/database/sqlite"
	"POS/backend/infrastructure"
	"errors"
	"strconv"
)

func DeleteSubscription(req DeleteSubscriptionRequest) error {
	result := sqlite.DB.Delete(&models.Subscription{}, req.ID)

	if result.RowsAffected == 0 {
		return errors.New("subscription not found")
	}

	infrastructure.NewActivityRepository().CreateActivity(models.ActivityLog{
		Entity:    "Subscription",
		EntityID:  req.ID,
		Action:    "Delete",
		Summary:   "Suscripción #" + strconv.FormatUint(uint64(req.ID), 10) + " eliminada",
	})
	
	return result.Error
}