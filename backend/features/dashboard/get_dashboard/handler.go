package get_dashboard

type GetDashboardHandler struct {}

func NewGetDashboardHandler() *GetDashboardHandler {
	return &GetDashboardHandler{}
}

func (h *GetDashboardHandler) Handle() (*DashboardResponse, error) {
	return GetDashboard()
}
