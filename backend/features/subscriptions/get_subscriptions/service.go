package get_subscriptions

import (
	"POS/backend/database/models"
	"POS/backend/database/sqlite"
)

func GetAllSubscriptions() ([]SubscriptionResponse, error) {
	var subs []SubscriptionResponse

	result := sqlite.DB.Model(&models.Subscription{}).
		Select(`subscriptions.id, subscriptions.client_id, subscriptions.membership_id,
				subscriptions.start_date, subscriptions.end_date,
				clients.first_name || ' ' || clients.last_name as client_name`).
		Joins("join clients on clients.id = subscriptions.client_id").
		Scan(&subs)

	if result.Error != nil {
		return nil, result.Error
	}

	if len(subs) == 0 {
		return []SubscriptionResponse{}, nil
	}

	return subs, nil
}
