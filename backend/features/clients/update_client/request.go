package update_client

type UpdateClientRequest struct {
	ID               uint      `json:"id"`
	FirstName        string    `json:"first_name"`
	LastName         string    `json:"last_name"`
	Email            string    `json:"email,omitempty"`
	Phone            string    `json:"phone,omitempty"`
	DNI              string    `json:"dni,omitempty"`
}
