package save_membership

import (
	"POS/backend/database/models"
	"POS/backend/database/sqlite"
	"POS/backend/infrastructure"
	"errors"
)

func SaveMembership (req SaveMembershipRequest) error {
	ormMembership := mapRequestToMembershipModel(req)
	result := sqlite.DB.Create(&ormMembership)
	if result.Error != nil {
		return errors.New("no se pudo guardar la membresía")
	}

	infrastructure.NewActivityRepository().CreateActivity(models.ActivityLog{
		Entity:   "Membership",
		EntityID: ormMembership.ID,
		Action:   "Create",
		Summary:  "Membresía '" + ormMembership.Name + "' creada",
	})
	return nil
}	