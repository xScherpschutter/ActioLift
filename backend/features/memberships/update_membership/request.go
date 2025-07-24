package update_membership

type UpdateMembershipRequest struct {
	ID int `json:"id"`
	Name string `json:"name"`
	Description string `json:"description"`
	Price float64 `json:"price"`
	Duration int `json:"duration"`
}