package domain

type Sale struct {
	ID       uint
	ClientID uint
	Total    float64
	Details []SalesDetail
}
