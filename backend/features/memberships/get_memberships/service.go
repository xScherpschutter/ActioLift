package get_memberships

import (
	"POS/backend/database/models"
	"POS/backend/database/sqlite"
)

func GetMemberships() ([]MembershipResponse, error) {
	var memberships []models.Membership
	result := sqlite.DB.Find(&memberships)
	if result.Error != nil {
		return nil, result.Error
	}
	return mapMembershipModelListToResponse(memberships), nil
}