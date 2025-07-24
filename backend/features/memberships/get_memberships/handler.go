package get_memberships

type GetMembershipsHandler struct {}

func NewGetAllMembershipsHandler() *GetMembershipsHandler {
	return &GetMembershipsHandler{}
}

func (h *GetMembershipsHandler) Handle() ([]MembershipResponse, error) {
	return GetMemberships()
} 