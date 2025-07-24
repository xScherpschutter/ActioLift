package save_client

type SaveClientHandler struct{}

func NewSaveClientHandler() *SaveClientHandler {
    return &SaveClientHandler{}
}

func (h *SaveClientHandler) Handle(req SaveClientRequest) error {
    return SaveClient(req)
}
