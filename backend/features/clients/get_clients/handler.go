package get_clients

type GetClientsHandler struct{}

func NewGetClientsHandler() *GetClientsHandler {
    return &GetClientsHandler{}
}

func (h *GetClientsHandler) Handle() ([]ClientResponse, error) {
    return GetAllClients()
}
