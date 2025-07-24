package delete_membership

import (
	"POS/backend/database/models"
	"POS/backend/database/sqlite"
	"errors"
)

func DeleteMembership(req DeleteMembershipRequest) error {
	result := sqlite.DB.Delete(&models.Membership{}, req.ID)
	if result.RowsAffected == 0 {
		return errors.New("membership not found")
	}
	return result.Error
}