package get_sales

import (
	"POS/backend/database/models"
	"POS/backend/database/sqlite"
	"errors"
)	

func GetSales() ([]SalesResponse, error) {
	var sales []SalesResponse

	result := sqlite.DB.Model(&models.Sale{}).
		Select(`sales.id, sales.client_id, sales.total,
			COALESCE(clients.first_name || ' ' || clients.last_name, 'Cliente no encontrado') as client_name, 
			sales.created_at as date`).
		Joins(`left join clients on clients.id = sales.client_id`).
		Scan(&sales)

	if result.Error != nil {
		return nil, errors.New("no se pudo obtener las ventas")
	}

	if len(sales) == 0 {
    	return []SalesResponse{}, nil
	}

	// Obtener detalles y agruparlos en un map // diccionario
	var salesDetails []SalesDetailResponse
	result = sqlite.DB.Model(&models.SalesDetail{}).
		Select(`sales_details.id, sales_details.sale_id, sales_details.product_id, sales_details.quantity,
		products.name as product_name, sales_details.price`).
		Joins(`join products on products.id = sales_details.product_id`).
		Scan(&salesDetails)
		
	if result.Error != nil {
		return nil, errors.New("no se pudo obtener los detalles de las ventas")
	}

	detailsMap := make(map[uint][]SalesDetailResponse)
	for _, detail := range salesDetails {
		detailsMap[detail.SaleID] = append(detailsMap[detail.SaleID], detail)
	}

	for i := range sales {
		sales[i].Details = detailsMap[sales[i].ID]
	}

	return sales, nil
}
