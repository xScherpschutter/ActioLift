package get_activities

import "POS/backend/database/models"

type ActivityPort interface {
	GetActivities() ([]models.ActivityLog, error)
	CreateActivity(activity models.ActivityLog) error
}