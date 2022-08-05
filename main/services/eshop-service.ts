import { CartItems, CalculationOptionsType, CalculationResponse } from "../../types/estore"
import { EstoreCustomerDto, YocoInputDto, YocoPayCustomerDto, PaymentDetailsDto } from "../../types/yoco"

export class EshopService {
    session: boolean
    constructor(private CART: CartItems[]) {
       this.session = sessionStorage.getItem('myCart') !== null
       // get cart items from session storage
       if (this.session) {
           this.CART = JSON.parse(sessionStorage.getItem('myCart'))
       }
    }

    public  getCart(): CartItems[] {
        console.log(this.CART)
        const stored = JSON.parse(sessionStorage.getItem('myCart'))
        return this.session ? stored: this.CART
    }

    public async addToCart(item: CartItems): Promise<CartItems[]> {
        const inCart = this.CART.filter(indb => item.name === indb.name || item.category === indb.category)
        if (inCart.length > 0) {
            inCart[0].quantity += 1
            inCart[0].amountInCents= inCart[0].unitPrice * inCart[0].quantity
        }
        else {
            item.quantity =1
            item.amountInCents = item.unitPrice
            this.CART.push(item)
        }
        sessionStorage.setItem('myCart', JSON.stringify(this.CART))
        console.log(sessionStorage.getItem('myCart'))
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
    /**
     * Calculates the total amount due  and the number of items in the cart
     * 
     */
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
    /**
     * Generates the Cart Items for display on click of the cart icon
     */
    public renderCart(): void {
        const cartItems = this.getCart()
        console.log(cartItems)
        const cartDiv =document.getElementById('CartItemsContainer')
        const ele = document.createElement("div")
        if (cartItems.length > 0) {
            cartDiv.innerHTML=''
            cartItems.forEach(item => {
                ele.className = "cart-body mx-4 flex justify-between items-center"
                ele.innerHTML = `
                <div class="poduct">
                    <p>${item.name}</p>
                    <p>${item.category}</p>              
                 </div>
                <div class="qty">${item.quantity}</div>
                <div class="unitPrice">${item.unitPrice}</div>
                <div class="amountInCents">${item.amountInCents}</div>
                `
            cartDiv.appendChild(ele)
            }
            )
        }
    }



}
