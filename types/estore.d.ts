export declare interface CartItems {
    name: string;
    category: string;
    amountInCents: number;
    quantity: number;
    sessionId?: string;
}

export declare type CalculationOptionsType = "amountInCents"| "itemsInCart"
export declare type CalculationResponse = {
    [key in CalculationOptionsType]: number;
};