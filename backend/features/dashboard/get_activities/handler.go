package get_activities

import "POS/backend/infrastructure"

type GetActivitiesHandler struct {
	Service *GetActivitiesService
}

func NewGetActivitiesHandler() *GetActivitiesHandler {
	service := NewGetActivitiesService(infrastructure.NewActivityRepository())
	handler := &GetActivitiesHandler{Service: service}
	return handler
}

func (h *GetActivitiesHandler) Handle() ([]ActivityResponse, error) {
	return h.Service.GetActivities()
}
