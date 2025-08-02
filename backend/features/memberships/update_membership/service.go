package update_membership

import (
	"POS/backend/database/models"
	"POS/backend/database/sqlite"
	"POS/backend/infrastructure"
	"errors"
)

func UpdateMembership (req UpdateMembershipRequest) error {
	var ormMembership models.Membership

	result := sqlite.DB.First(&ormMembership, req.ID)
	if result.Error != nil {
		return errors.New("no se encontró la membresía")
	}
	ormMembership.Name = req.Name
	ormMembership.Description = req.Description
	ormMembership.Price = req.Price
	ormMembership.Duration = req.Duration
	saveResult:= sqlite.DB.Save(&ormMembership)

	if saveResult.Error != nil {
		return errors.New("no se pudo actualizar la membresía")
	}

	infrastructure.NewActivityRepository().CreateActivity(models.ActivityLog{
		Entity:   "Membership",
		EntityID: ormMembership.ID,
		Action:   "Update",
		Summary:  "Membresía '" + ormMembership.Name + "' actualizada",
	})

	return nil
}