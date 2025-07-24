package delete_subscription

type DeleteSubscriptionHandler struct {}

func NewDeleteSubscriptionHandler() *DeleteSubscriptionHandler {
	return &DeleteSubscriptionHandler{}
}

func (h *DeleteSubscriptionHandler) Handle(req DeleteSubscriptionRequest) error {
	return DeleteSubscription(req)
} 

