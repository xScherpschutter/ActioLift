package save_subscription

import (
	"POS/backend/database/models"
	"POS/backend/database/sqlite"
	"POS/backend/domain"
	"POS/backend/infrastructure"
	"errors"
	"strconv"
)

func SaveSubscription(req SaveSubscriptionRequest) error {

	var membership models.Membership
	result := sqlite.DB.Model(&models.Membership{}).
		Where("id = ?", req.MembershipID).
		First(&membership)

	if result.Error != nil {
		return errors.New("no se pudo encontrar la membresía")
	}

	subscription := domain.Subscription {
		ClientID:     req.ClientID,
		MembershipID: req.MembershipID,
		Price:        membership.Price,
		StartDate:    req.StartDate,
		EndDate:      req.EndDate,
	}
	
	err := subscription.Validate()
	if err != nil {
		return err
	}

	ormSubscription := MapSubscriptionDomainToModel(subscription)
	result = sqlite.DB.Create(&ormSubscription)
	
	if result.Error != nil {
		return errors.New("no se pudo guardar la suscripción")
	}
	
	infrastructure.NewActivityRepository().CreateActivity(models.ActivityLog{
		Entity:    "Subscription",
		EntityID:  ormSubscription.ID,
		Action:    "Create",
		Summary:   "Suscripción #" + strconv.FormatUint(uint64(ormSubscription.ID), 10) + " creada",
	})
	
	return nil
}
