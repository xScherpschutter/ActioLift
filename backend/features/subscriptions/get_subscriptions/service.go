package get_subscriptions

import (
	"POS/backend/database/models"
	"POS/backend/database/sqlite"
)

func GetAllSubscriptions() ([]SubscriptionResponse, error) {
	var subscriptions []models.Subscription
	result := sqlite.DB.Find(&subscriptions)
	if result.Error != nil {
		return nil, result.Error
	}
	return mapSubscriptionListModelToResponse(subscriptions), nil
}