package get_activities

import "errors"

type GetActivitiesService struct {
	repository ActivityPort
}

func NewGetActivitiesService(repository ActivityPort) *GetActivitiesService {
	return &GetActivitiesService{repository: repository}
}

func (s *GetActivitiesService) GetActivities() ([]ActivityResponse, error) {
	activities, err := s.repository.GetActivities()
	if err != nil {
		return nil, errors.New("no se pudo obtener los últimos registros")
	}
	return MapActivitiesToResponse(activities), nil
}
