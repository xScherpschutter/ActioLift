package get_subscriptions

import (
	"POS/backend/database/models"
	"POS/backend/database/sqlite"
	"errors"
)

func GetAllSubscriptions() ([]SubscriptionResponse, error) {
	var subs []SubscriptionResponse

	result := sqlite.DB.Model(&models.Subscription{}).
		Select(`subscriptions.id, subscriptions.client_id, subscriptions.membership_id,
				subscriptions.price, subscriptions.start_date, subscriptions.end_date,
				COALESCE(clients.first_name || ' ' || clients.last_name, 'Cliente no encontrado') as client_name`).
		Joins("left join clients on clients.id = subscriptions.client_id").
		Scan(&subs)

	if result.Error != nil {
		return nil, errors.New("no se pudo obtener las suscripciones")
	}

	if len(subs) == 0 {
		return []SubscriptionResponse{}, nil
	}

	return subs, nil
}
