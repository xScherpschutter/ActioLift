package save_membership

type SaveMembershipRequest struct {
	Name string `json:"name"`
	Description string `json:"description"`
	Price float64 `json:"price"`
	Duration int `json:"duration"`
}