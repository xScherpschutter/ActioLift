export namespace delete_client {
	
	export class DeleteClientRequest {
	    id: number;
	
	    static createFrom(source: any = {}) {
	        return new DeleteClientRequest(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.id = source["id"];
	    }
	}

}

export namespace delete_membership {
	
	export class DeleteMembershipRequest {
	    id: number;
	
	    static createFrom(source: any = {}) {
	        return new DeleteMembershipRequest(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.id = source["id"];
	    }
	}

}

export namespace delete_product {
	
	export class DeleteProductRequest {
	    id: number;
	
	    static createFrom(source: any = {}) {
	        return new DeleteProductRequest(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.id = source["id"];
	    }
	}

}

export namespace delete_sale {
	
	export class DeleteSaleRequest {
	    id: number;
	
	    static createFrom(source: any = {}) {
	        return new DeleteSaleRequest(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.id = source["id"];
	    }
	}

}

export namespace delete_subscription {
	
	export class DeleteSubscriptionRequest {
	    id: number;
	
	    static createFrom(source: any = {}) {
	        return new DeleteSubscriptionRequest(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.id = source["id"];
	    }
	}

}

export namespace get_client_by_id {
	
	export class ClientResponse {
	    id: number;
	    first_name: string;
	    last_name: string;
	    email: string;
	    phone: string;
	    dni: string;
	
	    static createFrom(source: any = {}) {
	        return new ClientResponse(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.id = source["id"];
	        this.first_name = source["first_name"];
	        this.last_name = source["last_name"];
	        this.email = source["email"];
	        this.phone = source["phone"];
	        this.dni = source["dni"];
	    }
	}
	export class GetClientByIDQuery {
	    id: number;
	
	    static createFrom(source: any = {}) {
	        return new GetClientByIDQuery(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.id = source["id"];
	    }
	}

}

export namespace get_clients {
	
	export class ClientResponse {
	    id: number;
	    first_name: string;
	    last_name: string;
	    email: string;
	    phone: string;
	    dni: string;
	    registration_date: string;
	
	    static createFrom(source: any = {}) {
	        return new ClientResponse(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.id = source["id"];
	        this.first_name = source["first_name"];
	        this.last_name = source["last_name"];
	        this.email = source["email"];
	        this.phone = source["phone"];
	        this.dni = source["dni"];
	        this.registration_date = source["registration_date"];
	    }
	}

}

export namespace get_memberships {
	
	export class MembershipResponse {
	    id: number;
	    name: string;
	    description: string;
	    price: number;
	    duration: number;
	
	    static createFrom(source: any = {}) {
	        return new MembershipResponse(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.id = source["id"];
	        this.name = source["name"];
	        this.description = source["description"];
	        this.price = source["price"];
	        this.duration = source["duration"];
	    }
	}

}

export namespace get_products {
	
	export class ProductResponse {
	    id: number;
	    name: string;
	    price: number;
	    stock: number;
	
	    static createFrom(source: any = {}) {
	        return new ProductResponse(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.id = source["id"];
	        this.name = source["name"];
	        this.price = source["price"];
	        this.stock = source["stock"];
	    }
	}

}

export namespace get_sales {
	
	export class SalesDetailResponse {
	    sale_id: number;
	    product_id: number;
	    product_name: string;
	    quantity: number;
	    price: number;
	
	    static createFrom(source: any = {}) {
	        return new SalesDetailResponse(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.sale_id = source["sale_id"];
	        this.product_id = source["product_id"];
	        this.product_name = source["product_name"];
	        this.quantity = source["quantity"];
	        this.price = source["price"];
	    }
	}
	export class SalesResponse {
	    id: number;
	    client_id: number;
	    client_name: string;
	    date: string;
	    total: number;
	    details: SalesDetailResponse[];
	
	    static createFrom(source: any = {}) {
	        return new SalesResponse(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.id = source["id"];
	        this.client_id = source["client_id"];
	        this.client_name = source["client_name"];
	        this.date = source["date"];
	        this.total = source["total"];
	        this.details = this.convertValues(source["details"], SalesDetailResponse);
	    }
	
		convertValues(a: any, classs: any, asMap: boolean = false): any {
		    if (!a) {
		        return a;
		    }
		    if (a.slice && a.map) {
		        return (a as any[]).map(elem => this.convertValues(elem, classs));
		    } else if ("object" === typeof a) {
		        if (asMap) {
		            for (const key of Object.keys(a)) {
		                a[key] = new classs(a[key]);
		            }
		            return a;
		        }
		        return new classs(a);
		    }
		    return a;
		}
	}

}

export namespace get_subscriptions {
	
	export class SubscriptionResponse {
	    id: number;
	    client_id: number;
	    client_name: string;
	    membership_id: number;
	    start_date: string;
	    end_date: string;
	
	    static createFrom(source: any = {}) {
	        return new SubscriptionResponse(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.id = source["id"];
	        this.client_id = source["client_id"];
	        this.client_name = source["client_name"];
	        this.membership_id = source["membership_id"];
	        this.start_date = source["start_date"];
	        this.end_date = source["end_date"];
	    }
	}

}

export namespace save_client {
	
	export class SaveClientRequest {
	    first_name: string;
	    last_name: string;
	    email: string;
	    phone: string;
	    dni: string;
	    registration_date: string;
	
	    static createFrom(source: any = {}) {
	        return new SaveClientRequest(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.first_name = source["first_name"];
	        this.last_name = source["last_name"];
	        this.email = source["email"];
	        this.phone = source["phone"];
	        this.dni = source["dni"];
	        this.registration_date = source["registration_date"];
	    }
	}

}

export namespace save_membership {
	
	export class SaveMembershipRequest {
	    name: string;
	    description: string;
	    price: number;
	    duration: number;
	
	    static createFrom(source: any = {}) {
	        return new SaveMembershipRequest(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.name = source["name"];
	        this.description = source["description"];
	        this.price = source["price"];
	        this.duration = source["duration"];
	    }
	}

}

export namespace save_product {
	
	export class SaveProductRequest {
	    name: string;
	    price: number;
	    stock: number;
	
	    static createFrom(source: any = {}) {
	        return new SaveProductRequest(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.name = source["name"];
	        this.price = source["price"];
	        this.stock = source["stock"];
	    }
	}

}

export namespace save_sale {
	
	export class ProductItem {
	    product_id: number;
	    quantity: number;
	    price: number;
	
	    static createFrom(source: any = {}) {
	        return new ProductItem(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.product_id = source["product_id"];
	        this.quantity = source["quantity"];
	        this.price = source["price"];
	    }
	}
	export class SaveSaleRequest {
	    client_id: number;
	    details: ProductItem[];
	
	    static createFrom(source: any = {}) {
	        return new SaveSaleRequest(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.client_id = source["client_id"];
	        this.details = this.convertValues(source["details"], ProductItem);
	    }
	
		convertValues(a: any, classs: any, asMap: boolean = false): any {
		    if (!a) {
		        return a;
		    }
		    if (a.slice && a.map) {
		        return (a as any[]).map(elem => this.convertValues(elem, classs));
		    } else if ("object" === typeof a) {
		        if (asMap) {
		            for (const key of Object.keys(a)) {
		                a[key] = new classs(a[key]);
		            }
		            return a;
		        }
		        return new classs(a);
		    }
		    return a;
		}
	}

}

export namespace save_subscription {
	
	export class SaveSubscriptionRequest {
	    client_id: number;
	    membership_id: number;
	    start_date: string;
	    end_date: string;
	
	    static createFrom(source: any = {}) {
	        return new SaveSubscriptionRequest(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.client_id = source["client_id"];
	        this.membership_id = source["membership_id"];
	        this.start_date = source["start_date"];
	        this.end_date = source["end_date"];
	    }
	}

}

export namespace update_client {
	
	export class UpdateClientRequest {
	    id: number;
	    first_name: string;
	    last_name: string;
	    email: string;
	    phone: string;
	    dni: string;
	    registration_date: string;
	
	    static createFrom(source: any = {}) {
	        return new UpdateClientRequest(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.id = source["id"];
	        this.first_name = source["first_name"];
	        this.last_name = source["last_name"];
	        this.email = source["email"];
	        this.phone = source["phone"];
	        this.dni = source["dni"];
	        this.registration_date = source["registration_date"];
	    }
	}

}

export namespace update_membership {
	
	export class UpdateMembershipRequest {
	    id: number;
	    name: string;
	    description: string;
	    price: number;
	    duration: number;
	
	    static createFrom(source: any = {}) {
	        return new UpdateMembershipRequest(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.id = source["id"];
	        this.name = source["name"];
	        this.description = source["description"];
	        this.price = source["price"];
	        this.duration = source["duration"];
	    }
	}

}

export namespace update_product {
	
	export class UpdateProductRequest {
	    id: number;
	    name: string;
	    price: number;
	    stock: number;
	
	    static createFrom(source: any = {}) {
	        return new UpdateProductRequest(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.id = source["id"];
	        this.name = source["name"];
	        this.price = source["price"];
	        this.stock = source["stock"];
	    }
	}

}

export namespace update_subscription {
	
	export class UpdateSubscriptionRequest {
	    id: number;
	    membership_id: number;
	    client_id: number;
	    start_date: string;
	    end_date: string;
	
	    static createFrom(source: any = {}) {
	        return new UpdateSubscriptionRequest(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.id = source["id"];
	        this.membership_id = source["membership_id"];
	        this.client_id = source["client_id"];
	        this.start_date = source["start_date"];
	        this.end_date = source["end_date"];
	    }
	}

}

