package save_membership

import (
	"POS/backend/database/sqlite"
)

func SaveMembership (req SaveMembershipRequest) error {
	ormMembership := mapRequestToMembershipModel(req)
	result := sqlite.DB.Create(&ormMembership)
	return result.Error
}	