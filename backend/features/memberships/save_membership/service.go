package save_membership

import (
	"POS/backend/database/models"
	"POS/backend/database/sqlite"
	"POS/backend/infrastructure"
)

func SaveMembership (req SaveMembershipRequest) error {
	ormMembership := mapRequestToMembershipModel(req)
	result := sqlite.DB.Create(&ormMembership)

	infrastructure.NewActivityRepository().CreateActivity(models.ActivityLog{
		Entity:   "Membership",
		EntityID: ormMembership.ID,
		Action:   "Create",
		Summary:  "Membresía '" + ormMembership.Name + "' creada",
	})
	return result.Error
}	