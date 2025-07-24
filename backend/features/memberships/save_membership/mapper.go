package save_membership

import (
	"POS/backend/database/models"
)

func mapRequestToMembershipModel(req SaveMembershipRequest) models.Membership {
	return models.Membership{
		Name:        req.Name,
		Description: req.Description,
		Price:       req.Price,
		Duration:    req.Duration,
	}
}