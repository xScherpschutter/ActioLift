package get_activities

import (
	"POS/backend/database/models"
)

func MapActivityToResponse(activity models.ActivityLog) ActivityResponse {
	return ActivityResponse{
		ID:       activity.ID,
		Entity:   activity.Entity,
		EntityID: activity.EntityID,
		Action:   activity.Action,
		Summary:  activity.Summary,
		CreatedAt: activity.CreatedAt.Format("2006-01-02 15:04:05"),
	}
}

func MapActivitiesToResponse(activities []models.ActivityLog) []ActivityResponse {
	var response []ActivityResponse
	for _, activity := range activities {
		response = append(response, MapActivityToResponse(activity))
	}
	return response
}
