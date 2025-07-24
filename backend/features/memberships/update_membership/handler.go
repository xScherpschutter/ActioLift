package update_membership

type UpdateMembershipHandler struct{}

func NewUpdateMembershipHandler() *UpdateMembershipHandler {
	return &UpdateMembershipHandler{}
}

func (h *UpdateMembershipHandler) Handle(req UpdateMembershipRequest) error {
	return UpdateMembership(req)
}