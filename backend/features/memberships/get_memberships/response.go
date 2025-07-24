package get_memberships

type MembershipResponse struct {
	ID          uint   `json:"id"`
	Name        string `json:"name"`
	Description string `json:"description"`
	Price       float64   `json:"price"`
	Duration    int   `json:"duration"`
}