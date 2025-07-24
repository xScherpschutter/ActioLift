package get_subscriptions

type GetAllSubscriptionsHandler struct{}

func NewGetAllSubscriptionsHandler() *GetAllSubscriptionsHandler {
	return &GetAllSubscriptionsHandler{}
}

func (h *GetAllSubscriptionsHandler) Handle() ([]SubscriptionResponse, error) {
	return GetAllSubscriptions()
}