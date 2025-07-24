package update_subscription

type UpdateSubscriptionRequest struct {
	ID uint `json:"id"`
	MembershipID uint `json:"membership_id"`
	ClientID uint `json:"client_id"`
	StartDate string `json:"start_date"`
	EndDate string `json:"end_date"`
}