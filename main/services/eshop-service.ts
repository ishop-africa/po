import { CartItems, CalculationOptionsType, CalculationResponse } from "../../types/estore"
import { EstoreCustomerDto, YocoInputDto, YocoPayCustomerDto, PaymentDetailsDto } from "../../types/yoco"

export class EshopService {
    constructor(private CART: CartItems[]) {
       
    }

    public  getCart(): CartItems[] {
        console.log(this.CART)
        return this.CART
    }

    public async addToCart(item: CartItems): Promise<CartItems[]> {
        const inCart = this.CART.filter(indb => item.name === indb.name)
        if (inCart.length > 0) {
            inCart[0].quantity += 1
            inCart[0].amountInCents= inCart[0].unitPrice * inCart[0].quantity
        }
        else {
            item.quantity =1
            item.amountInCents = item.unitPrice
            this.CART.push(item)
        }
        return this.CART
    }

    public async removeFromCart(item: CartItems): Promise<CartItems[]> {
        this.CART = this.CART.filter(cartItem => cartItem.name !== item.name)
        return this.CART
    }

    public async clearCart(): Promise<CartItems[]> {
        this.CART = []
        return this.CART
    }

    public async checkout(paymentDetails: EstoreCustomerDto): Promise<PaymentResponse> {
        return
    }

    public async getPaymentDetails(yoco:YocoInputDto,customer: YocoPayCustomerDto ): Promise<PaymentDetailsDto> {
        return {
            amountInCents: 0,
            currency: '',
            token: '',
            metadata: {
                affliate: '',
                email: '',
                phone: '',
                firstName: '',
                lastName: ''
            },
            customer: {
                email: '',
                phone: '',
                firstName: '',
                lastName: ''
            }
        }
    }

    public  calculateTotal(option: CalculationOptionsType): number{
        let result = 0
        if (option === 'amountInCents') {
            result = this.CART.reduce((acc, item) => acc + item.amountInCents, 0)
        }
        else {
            result = this.CART.reduce((acc, item) => acc + item.quantity, 0)
        }
        return result

    }

    public async getCustomerDetals(): Promise<CartItems[]> {
        return this.CART
    }




}
