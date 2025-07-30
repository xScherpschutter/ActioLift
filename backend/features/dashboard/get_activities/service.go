package get_activities

type GetActivitiesService struct {
	repository ActivityPort
}

func NewGetActivitiesService(repository ActivityPort) *GetActivitiesService {
	return &GetActivitiesService{repository: repository}
}

func (s *GetActivitiesService) GetActivities() ([]ActivityResponse, error) {
	activities, err := s.repository.GetActivities()
	if err != nil {
		return nil, err
	}
	return MapActivitiesToResponse(activities), nil
}

