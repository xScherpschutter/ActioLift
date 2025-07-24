package save_membership

type SaveMembershipHandler struct {}

func NewSaveMembershipHandler () *SaveMembershipHandler {
	return &SaveMembershipHandler{}
}

func (h *SaveMembershipHandler) Handle (req SaveMembershipRequest) error {
	return SaveMembership(req)
}