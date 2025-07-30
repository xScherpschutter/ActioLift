package infrastructure

import (
	"POS/backend/database/models"
	"POS/backend/database/sqlite"

	"gorm.io/gorm"
)

type ActivityRepository struct {
	db *gorm.DB
}

func NewActivityRepository() *ActivityRepository {
	db := sqlite.DB
	return &ActivityRepository{db: db}
}

func (r *ActivityRepository) GetActivities() ([]models.ActivityLog, error) {
	var activities []models.ActivityLog
	if err := r.db.Order("created_at desc").Limit(5).Find(&activities).Error; err != nil {
		return nil, err
	}
	return activities, nil
}

func (r *ActivityRepository) CreateActivity(activity models.ActivityLog) error {
	if err := r.db.Create(&activity).Error; err != nil {
		return err
	}
	return nil
}
