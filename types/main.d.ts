declare interface PaymentSetailsDto {
    amountInCents: number
    currency: string
    token: string
    metadata: YocoPayMetadataDto
}

declare interface YocoPayMetadataDto {
    name: string
    email: string
    phone: string
    isAfliate: boolean
}