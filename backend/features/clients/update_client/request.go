package update_client

type UpdateClientRequest struct {
	ID               uint      `json:"id"`
	FirstName        string    `json:"first_name"`
	LastName         string    `json:"last_name"`
	Email            string    `json:"email"`
	Phone            string    `json:"phone"`
	DNI              string    `json:"dni"`
}
