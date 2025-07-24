package save_subscription

type SaveSubscriptionRequest struct {
	ClientID     uint `json:"client_id"`
	MembershipID uint `json:"membership_id"`
	StartDate    string `json:"start_date"`
	EndDate      string `json:"end_date"`
}
