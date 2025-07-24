package save_client

type SaveClientRequest struct {
    FirstName        string    `json:"first_name"`
    LastName         string    `json:"last_name"`
    Email            string    `json:"email"`
    Phone            string    `json:"phone"`
    DNI              string    `json:"dni"`
    RegistrationDate string     `json:"registration_date"`
}
