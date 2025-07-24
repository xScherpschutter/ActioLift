package update_membership

import (
	"POS/backend/database/models"
	"POS/backend/database/sqlite"
	"errors"
)

func UpdateMembership (req UpdateMembershipRequest) error {
	var ormMembership models.Membership

	result := sqlite.DB.First(&ormMembership, req.ID)
	if result.Error != nil {
		return errors.New("membership not found")
	}
	ormMembership.Name = req.Name
	ormMembership.Description = req.Description
	ormMembership.Price = req.Price
	ormMembership.Duration = req.Duration

	saveResult:= sqlite.DB.Save(&ormMembership)
	return saveResult.Error
}