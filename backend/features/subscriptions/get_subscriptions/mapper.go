package get_subscriptions

import "POS/backend/database/models"

func mapSubscriptionModelToResponse(s models.Subscription) SubscriptionResponse {
	return SubscriptionResponse{
		ID: s.ID,
		ClientID: s.ClientID,
		MembershipID: s.MembershipID,
		StartDate: s.StartDate,
		EndDate: s.EndDate,
	}
}

func mapSubscriptionListModelToResponse(subscriptions []models.Subscription) []SubscriptionResponse {
	responses := make([]SubscriptionResponse, len(subscriptions))
	for i, s := range subscriptions {
		responses[i] = mapSubscriptionModelToResponse(s)
	}
	return responses
}
