
export interface YocoInputDto {
    publicKey: string;
    amountInCents: number
    metadata: YocoPayMetadataDto
    customer: YocoPayCustomerDto
    description: string
}

export declare interface YocoPayCustomerDto {
    email: string
    phone: string
    firstName: string
    lastName: string
}


export declare interface YocoPayMetadataDto extends YocoPayCustomerDto{
    affliate: string
}

export interface PaymentDetailsDto {
    amountInCents: number
    currency: string
    token: string
    metadata: YocoPayMetadataDto
    customer: YocoPayCustomerDto
}

export interface PaymentResponse {
    success: boolean
    message: string
    [key: string]: any
}