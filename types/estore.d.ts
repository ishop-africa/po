export declare interface CartItems {
    name: string;
    category: string;
    amountInCents?: number;
    quantity?: number;
    unitPrice: number;
    sessionId?: string;
}

export declare type CalculationOptionsType = "amountInCents"| "itemsInCart"
export declare type CalculationResponse = {
    [key in CalculationOptionsType]: number;
};

export declare type FormTypes = "PersonalDetails" | "Shipping" | "Payment"
export declare interface RenderDataObject <A> {
    [key:string]: A
}

export interface PersonalDetailsForm {
    name: string
    type: string
    [key:string]: any
}
