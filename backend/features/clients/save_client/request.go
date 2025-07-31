package save_client

type SaveClientRequest struct {
    FirstName        string    `json:"first_name"`
    LastName         string    `json:"last_name"`
    Email            string    `json:"email,omitempty"`
    Phone            string    `json:"phone,omitempty"`
    DNI              string    `json:"dni,omitempty"`
    RegistrationDate string     `json:"registration_date"`
}
