package delete_client

type DeleteClientHandler struct{}

func NewDeleteClientHandler() *DeleteClientHandler {
	return &DeleteClientHandler{}
}

func (h *DeleteClientHandler) Handle(req DeleteClientRequest) error {
	return DeleteClient(req)
}