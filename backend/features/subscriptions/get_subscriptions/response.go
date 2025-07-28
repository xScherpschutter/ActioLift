package get_subscriptions

type SubscriptionResponse struct {
	ID           uint   `json:"id"`
	ClientID     uint   `json:"client_id"`
	ClientName   string `json:"client_name"`
	MembershipID uint   `json:"membership_id"`
	StartDate    string `json:"start_date"`
	EndDate      string `json:"end_date"`
}
