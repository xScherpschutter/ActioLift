package get_memberships

import (
	"POS/backend/database/models"
)

func mapMembershipModelToResponse(m models.Membership) MembershipResponse {
	return MembershipResponse{
		ID:               m.ID,
		Name:             m.Name,
		Description:      m.Description,
		Price:            m.Price,
		Duration:         m.Duration,
	}
}

func mapMembershipModelListToResponse(memberships []models.Membership) []MembershipResponse {
	responses := make([]MembershipResponse, len(memberships))
	for i, m := range memberships {
		responses[i] = mapMembershipModelToResponse(m)
	}
	return responses
}