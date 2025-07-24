package delete_membership

type DeleteMembershipHandler struct {}

func NewDeleteMembershipHandler() *DeleteMembershipHandler {
	return &DeleteMembershipHandler{}
}

func (h *DeleteMembershipHandler) Handle(req DeleteMembershipRequest) error {
	return DeleteMembership(req)
}