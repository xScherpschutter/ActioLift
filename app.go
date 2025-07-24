package main

import (
	"context"
	"fmt"

	"POS/backend/features/clients/delete_client"
	"POS/backend/features/clients/get_client_by_id"
	"POS/backend/features/clients/get_clients"
	"POS/backend/features/clients/save_client"
	"POS/backend/features/clients/update_client"
	

	"POS/backend/features/products/delete_product"
	"POS/backend/features/products/get_products"
	"POS/backend/features/products/save_product"
	"POS/backend/features/products/update_product"

	"POS/backend/features/memberships/delete_membership"
	"POS/backend/features/memberships/get_memberships"
	"POS/backend/features/memberships/save_membership"
	"POS/backend/features/memberships/update_membership"

	"POS/backend/features/subscriptions/save_subscription"
	"POS/backend/features/subscriptions/update_subscription"
	"POS/backend/features/subscriptions/get_subscriptions"
	"POS/backend/features/subscriptions/delete_subscription"
	
)

// App struct
type App struct {
	ctx context.Context
}

// NewApp creates a new App application struct
func NewApp() *App {
	return &App{}
}

// startup is called when the app starts. The context is saved
// so we can call the runtime methods
func (a *App) startup(ctx context.Context) {
	a.ctx = ctx
}

// Greet returns a greeting for the given name
func (a *App) Greet(name string) string {
	return fmt.Sprintf("Hello %s, It's show time!", name)
}

// Client Methods

func (a *App) SaveClient(req save_client.SaveClientRequest) error {
    return save_client.NewSaveClientHandler().Handle(req)
}

func (a *App) GetAllClients() ([]get_clients.ClientResponse, error) {
	return get_clients.NewGetClientsHandler().Handle()
}

func (a *App) GetClientByID(q get_client_by_id.GetClientByIDQuery) (get_client_by_id.ClientResponse, error) {
	return get_client_by_id.NewGetClientByIDHandler().Handle(q)
}

func (a *App) UpdateClient(req update_client.UpdateClientRequest) error {
	return update_client.NewUpdateClientHandler().Handle(req)
}

func (a *App) DeleteClient(req delete_client.DeleteClientRequest) error {
	return delete_client.NewDeleteClientHandler().Handle(req)
}

// Product Methods

func (a *App) SaveProduct(req save_product.SaveProductRequest) error {
    return save_product.NewSaveProductHandler().Handle(req)
}
func (a *App) GetAllProducts() ([]get_products.ProductResponse, error) {
	return get_products.NewGetAllProductsHandler().Handle()
}
func (a *App) UpdateProduct(req update_product.UpdateProductRequest) error {
	return update_product.NewUpdateProductHandler().Handle(req)
}
func (a *App) DeleteProduct(req delete_product.DeleteProductRequest) error {
	return delete_product.NewDeleteProductHandler().Handle(req)
}
// Membership Methods

func (a *App) SaveMembership(req save_membership.SaveMembershipRequest) error {
    return save_membership.NewSaveMembershipHandler().Handle(req)
}

func (a *App) GetAllMemberships() ([]get_memberships.MembershipResponse, error) {
	return get_memberships.NewGetAllMembershipsHandler().Handle()
}

func (a *App) UpdateMembership(req update_membership.UpdateMembershipRequest) error {
	return update_membership.NewUpdateMembershipHandler().Handle(req)
}

func (a *App) DeleteMembership(req delete_membership.DeleteMembershipRequest) error {
	return delete_membership.NewDeleteMembershipHandler().Handle(req)
}

// Subscription Methods

func (a *App) SaveSubscription(req save_subscription.SaveSubscriptionRequest) error {
	return save_subscription.NewSaveSubscriptionHandler().Handle(req)
}

func (a *App) GetAllSubscriptions() ([]get_subscriptions.SubscriptionResponse, error) {
	return get_subscriptions.NewGetAllSubscriptionsHandler().Handle()
}

func (a *App) UpdateSubscription(req update_subscription.UpdateSubscriptionRequest) error {
	return update_subscription.NewUpdateSubscriptionHandler().Handle(req)
}

func (a *App) DeleteSubscription(req delete_subscription.DeleteSubscriptionRequest) error {
	return delete_subscription.NewDeleteSubscriptionHandler().Handle(req)
}