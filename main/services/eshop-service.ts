import { CartItems, CalculationOptionsType, FormTypes, PersonalDetailsForm, RenderDataObject } from "../../types/estore"
import { EstoreCustomerDto, YocoInputDto, YocoPayCustomerDto, PaymentDetailsDto } from "../../types/yoco"
import { initYoco } from "../yoco"

export class EshopService {
    session: boolean
    constructor(private CART: CartItems[]) {
        this.session = sessionStorage.getItem('myCart') !== null
        // get cart items from session storage
        if (this.session) {
            this.CART = JSON.parse(sessionStorage.getItem('myCart'))
            this.renderCart
        }
    }
    public formatCamelCaseString(str: string): string {
        return str.split(/(?=[A-Z])/).join(' ')
    }
    public getCart(): CartItems[] {
        console.log(this.CART)
        const stored = JSON.parse(sessionStorage.getItem('myCart'))
        return this.session ? stored : this.CART
    }

    public async addToCart(item: CartItems): Promise<CartItems[]> {
        const inCart = this.CART.filter(indb => item.name === indb.name && item.category === indb.category)
        if (inCart.length > 0) {
            inCart[0].quantity += 1
            inCart[0].amountInCents = inCart[0].unitPrice * inCart[0].quantity
        }
        else {
            item.quantity = 1
            item.amountInCents = item.unitPrice
            this.CART.push(item)
        }
        sessionStorage.setItem('myCart', JSON.stringify(this.CART))
        console.log(sessionStorage.getItem('myCart'))
        return this.CART
    }
    public updateCart(index:number, qty:number): CartItems[] {
        this.CART[index].quantity = qty
        this.CART[index].amountInCents = this.CART[index].unitPrice * qty
        return this.CART

    }
    public async removeFromCart(item: CartItems): Promise<CartItems[]> {
        this.CART = this.CART.filter(cartItem => cartItem.name !== item.name)
        sessionStorage.setItem('myCart', JSON.stringify(this.CART))
        this.renderCart
        return this.CART
    }

    public async clearCart(): Promise<CartItems[]> {
        this.CART = []
        return this.CART
    }
    public async createCustomer(data: YocoInputDto): Promise<any> {
        const response = await initYoco(data)
        return response;
    }
    public async checkout(paymentDetails: EstoreCustomerDto): Promise<PaymentResponse> {
        return
    }
    public generateDescriptionFromCartItemNames(): string {
        return this.CART.reduce((acc, item) => acc + item.name + ',','')
    }
    public async getPaymentDetails(yoco: YocoInputDto): Promise<PaymentDetailsDto> {
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
    public calculateTotal(option: CalculationOptionsType): number {
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
    public get renderCart(): HTMLElement {
        const cartItems = this.getCart()
        console.log(cartItems)
        const cartDiv = document.getElementById('CartItemsList')
        cartDiv.innerHTML = ''
        const subTotal = document.getElementById('subTotal')
        const total = this.calculateTotal('amountInCents')
        const Tocurrency = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'ZAR' }).format(total)
        subTotal.innerHTML = Tocurrency
        
        if (cartItems.length > 0) {
            
            // crate cart items table
            cartItems.forEach((item, index) => {
                
                const ele = document.createElement("li")
                
                ele.className = "flex py-6"
                ele.innerHTML = `
                <div class="h-24 w-24 hidden flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                  <img src="https://tailwindui.com/img/ecommerce-images/shopping-cart-page-04-product-01.jpg"
                    alt="Salmon orange fabric pouch with match zipper, gray zipper pull, and adjustable hip belt."
                    class="h-full w-full object-cover object-center">
                </div>

                <div class="ml-4 flex flex-1 flex-col">
                  <div>
                    <div class="flex justify-between text-base font-medium text-gray-900">
                      <h3>
                        <a href="#">${item.name}</a>
                      </h3>
                      <p class="ml-4">${item.amountInCents}</p>
                    </div>
                    <p class="mt-1 text-sm text-gray-500">${item.category}</p>
                  </div>
                  <div class="flex flex-1 items-end justify-between text-sm">
                    <p class="text-gray-500">Qty ${item.quantity}</p>
                    <div class="flex">
                      <button type="button" data-index='${index}' id='item_${index}'
                        class="font-medium removeFromCart  text-yellow-600 hover:text-yellow-500">Remove</button>
                    </div>
                  </div>
                </div>
        
                `;
                cartDiv.appendChild(ele)
            }
            )
        }else{
            const elem = document.createElement('li')
            elem.innerHTML = "<button class='closeCart'>No items in cart - proceed to shopping</button>'"
            cartDiv.appendChild(elem)
        }
        return cartDiv
    }
    public renderPersonalDetails(data: RenderDataObject<PersonalDetailsForm[]>): HTMLElement {
        
        return null;
    }

    public formatCurrency(amount: number, currency: string ='ZAR'): string {
        return new Intl.NumberFormat('en-US', { style: 'currency', currency }).format(amount)
    }
   

}
