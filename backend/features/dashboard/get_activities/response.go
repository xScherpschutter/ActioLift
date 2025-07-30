package get_activities

type ActivityResponse struct {
	ID        uint      `json:"id"`
	Entity    string    `json:"entity"`
	EntityID  uint      `json:"entity_id"`
	Action    string    `json:"action"`
	Summary   string    `json:"summary"`
	CreatedAt string 	`json:"created_at"`
}