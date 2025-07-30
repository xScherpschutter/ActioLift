package get_dashboard

import (
	"POS/backend/database/models"
	"POS/backend/database/sqlite"
	"time"
)

func GetDashboard() (*DashboardResponse, error) {
	var dashboard DashboardResponse

	// Total Products
	if err := sqlite.DB.Model(&models.Product{}).Count(&dashboard.TotalProducts).Error; err != nil {
		return nil, err
	}

	// Total Clients
	if err := sqlite.DB.Model(&models.Client{}).Count(&dashboard.TotalClients).Error; err != nil {
		return nil, err
	}

	// Active Subscriptions 
	if err := sqlite.DB.Model(&models.Subscription{}).
		Where("end_date > ?", time.Now()).
		Count(&dashboard.ActiveSubscriptions).Error; err != nil {
		return nil, err
	}

	// Total Sales
	if err := sqlite.DB.Model(&models.Sale{}).Count(&dashboard.TotalSales).Error; err != nil {
		return nil, err
	}

	// Total Revenue
	query := `
	SELECT COALESCE(SUM(amount), 0) as total_revenue FROM (
		SELECT total as amount FROM sales
		UNION ALL
		SELECT m.price as amount
		FROM subscriptions s
		JOIN memberships m ON s.membership_id = m.id
	)
	`
	if err := sqlite.DB.Raw(query).
		Scan(&dashboard.TotalRevenue).Error; err != nil {
		return nil, err
	}

	// New Clients (últimos 30 días)
	if err := sqlite.DB.Model(&models.Client{}).
		Where("created_at >= ?", time.Now().AddDate(0, 0, -30)).
		Count(&dashboard.NewClients).Error; err != nil {
		return nil, err
	}

	// Sold Products (total de ventas recientes, no productos individuales vendidos)
	if err := sqlite.DB.Model(&models.Sale{}).
		Where("created_at >= ?", time.Now().AddDate(0, 0, -30)).
		Count(&dashboard.SoldProducts).Error; err != nil {
		return nil, err
	}

	// Sold Memberships (últimos 30 días)
	if err := sqlite.DB.Model(&models.Subscription{}).
		Where("start_date >= ?", time.Now().AddDate(0, 0, -30)).
		Count(&dashboard.SoldMemberships).Error; err != nil {
		return nil, err
	}

	// Average Sale
	q := `
		SELECT COALESCE(AVG(amount), 0) as average_sale FROM (
			SELECT total as amount FROM sales WHERE created_at >= ?
			UNION ALL
			SELECT m.price as amount
			FROM subscriptions s
			JOIN memberships m ON s.membership_id = m.id
			WHERE s.start_date >= ?
		)
	`
	if err := sqlite.DB.Raw(q, time.Now().AddDate(0, 0, -30), time.Now().AddDate(0, 0, -30)).
		Scan(&dashboard.AverageSale).Error; err != nil {
		return nil, err
	}


	return &dashboard, nil
}
