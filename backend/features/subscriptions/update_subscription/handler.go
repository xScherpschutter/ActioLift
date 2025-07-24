package update_subscription

type UpdateSubscriptionHandler struct {}

func NewUpdateSubscriptionHandler() *UpdateSubscriptionHandler {
	return &UpdateSubscriptionHandler{}
}

func (h *UpdateSubscriptionHandler) Handle(req UpdateSubscriptionRequest) error {
	return UpdateSubscription(req)
}
