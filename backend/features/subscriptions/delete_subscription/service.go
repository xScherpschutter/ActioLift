package delete_subscription

import (
	"POS/backend/database/models"
	"POS/backend/database/sqlite"
	"errors"
)

func DeleteSubscription(req DeleteSubscriptionRequest) error {
	result := sqlite.DB.Delete(&models.Subscription{}, req.ID)

	if result.RowsAffected == 0 {
		return errors.New("subscription not found")
	}

	return result.Error
}