package delete_membership

import (
	"POS/backend/database/models"
	"POS/backend/database/sqlite"
	"POS/backend/infrastructure"
	"errors"
	"strconv"
)

func DeleteMembership(req DeleteMembershipRequest) error {
	var membership models.Membership

	result := sqlite.DB.First(&membership, req.ID)
	if result.Error != nil {
		return errors.New("no se encontró la membresía")
	}

	result = sqlite.DB.Delete(&membership, req.ID)

	if result.RowsAffected == 0 {
		return errors.New("no se encontró la membresía")
	}

	infrastructure.NewActivityRepository().CreateActivity(models.ActivityLog{
		Entity:   "Membership",
		EntityID: membership.ID,
		Action:   "Delete",
		Summary:  "Membresía #" + strconv.FormatUint(uint64(membership.ID), 10) + " eliminada (" + membership.Name + ")",
	})

	return nil
}