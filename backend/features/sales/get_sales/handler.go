package get_sales

type GetSalesHandler struct{}

func NewGetSalesHandler() *GetSalesHandler {
    return &GetSalesHandler{}
}

func (h *GetSalesHandler) Handle() ([]SalesResponse, error) {
    return GetSales()
}