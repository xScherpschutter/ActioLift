package update_client

type UpdateClientHandler struct{}

func NewUpdateClientHandler() *UpdateClientHandler {
	return &UpdateClientHandler{}
}

func (h *UpdateClientHandler) Handle(req UpdateClientRequest) error {
	return UpdateClient(req)
}