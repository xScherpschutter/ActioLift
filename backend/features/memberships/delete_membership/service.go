package delete_membership

import (
	"POS/backend/database/models"
	"POS/backend/database/sqlite"
	"POS/backend/infrastructure"
	"errors"
)

func DeleteMembership(req DeleteMembershipRequest) error {
	var membership models.Membership
	result := sqlite.DB.Delete(&membership, req.ID)
	if result.RowsAffected == 0 {
		return errors.New("membership not found")
	}

	infrastructure.NewActivityRepository().CreateActivity(models.ActivityLog{
		Entity:   "Membership",
		EntityID: membership.ID,
		Action:   "Delete",
		Summary:  "Membresía '" + membership.Name + "' eliminada",
	})

	return result.Error
}