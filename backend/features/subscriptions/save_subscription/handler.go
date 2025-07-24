package save_subscription

type SaveSubscriptionHandler struct {}

func NewSaveSubscriptionHandler() *SaveSubscriptionHandler {
	return &SaveSubscriptionHandler{}
}

func (h *SaveSubscriptionHandler) Handle(req SaveSubscriptionRequest) error {
	return SaveSubscription(req)
}