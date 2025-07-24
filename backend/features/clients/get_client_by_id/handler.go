package get_client_by_id

type GetClientByIDHandler struct{}

func NewGetClientByIDHandler() *GetClientByIDHandler{
	return &GetClientByIDHandler{}
}

func (h *GetClientByIDHandler) Handle(q GetClientByIDQuery) (ClientResponse, error) {
	return GetClientByID(q)
}