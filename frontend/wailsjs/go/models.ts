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

export namespace get_subscriptions {
	
	export class SubscriptionResponse {
	    id: number;
	    client_id: number;
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

