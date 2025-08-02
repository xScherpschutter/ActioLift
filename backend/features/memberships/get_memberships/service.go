package get_memberships

import (
	"POS/backend/database/models"
	"POS/backend/database/sqlite"
	"errors"
)

func GetMemberships() ([]MembershipResponse, error) {
	var memberships []models.Membership
	result := sqlite.DB.Find(&memberships)
	if result.Error != nil {
		return nil, errors.New("no se pudo obtener las membresías")
	}
	return mapMembershipModelListToResponse(memberships), nil
}