package get_dashboard

type DashboardResponse struct {
	TotalClients  int64 `json:"total_clients"`
	ActiveSubscriptions int64 `json:"active_subscriptions"`
	TotalSales    int64 `json:"total_sales"`
	TotalRevenue  float64 `json:"total_revenue"`
	TotalProducts int64 `json:"total_products"`
	NewClients    int64 `json:"new_clients"`
	SoldProducts  int64 `json:"sold_products"`
	SoldMemberships int64 `json:"sold_memberships"`
	AverageSale   float64 `json:"average_sale"`
	TodaySales		float64 `json:"today_sales"`
}