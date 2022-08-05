import { CalculationOptionsType, CalculationResponse, CartItems } from '../types/estore';
import { EstoreCustomerDto, PaymentDetailsDto, YocoInputDto, YocoPayCustomerDto } from '../types/yoco';
export const EshopPayments = () => {
    const bsJs = document.createElement("script")
    const bsCss = document.createElement('link')
    bsCss.href = 'https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css';
    bsCss.integrity = 'sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3';
    bsCss.crossOrigin = 'anonymous'
    var CART: CartItems[] = [];
    bsJs.src = "https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js";
    bsJs.integrity = "sha384-ka7Sk0Gln4gmtz2MlQnikT1wXgYsOg+OMhuP+IlRH9sENBO0LRn5q+8nbTov4+1p";
    bsJs.crossOrigin = "anonymous";
    // for development only hook these elements to the head of the page

    const eshopPaymentForm = document.getElementById("po-payment-form")
    if (eshopPaymentForm) {
        eshopPaymentForm.classList.add('hidden')
        const link = document.getElementsByTagName("a")
        /**
         * The Login in this Section extracts information form the HTML skeleton and creates a structred object CART
         */
        for (let i = 0; i < link.length; i++) {
            if (link[i].innerHTML === "Order Now") {

                link[i].addEventListener('click', (e) => {
                    e.preventDefault();
                    const pa = link[i].parentElement
                    const price = pa.parentElement.nextElementSibling.children[0].innerHTML
                    const categores = pa.parentElement.previousElementSibling.children
                    const name = categores[0].innerHTML.replace(/[\n\r]/g, ''); // remove \n
                    // @ts-ignore 
                    const category = categores[1].innerText
                    price.replace("R ", "")
                    const amountInCents = Math.ceil(parseInt(price.replace('R ', '')) * 100)
                    console.log({ name, category, amountInCents })

                    console.log(CART)
                    // eshopPaymentForm.classList.toggle('hidden')
                })
            }
        }
        eshopPaymentForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const formData = new FormData(document.querySelector('#po-payment-form'));
            const customer = {}
            for (const [key, value] of formData.entries()) {
                if (value !== '') {
                    customer[key] = value
                    key.replace(' ', '_')
                    key.replace('-', '_')
                    customer[key] = value
                }
            }
            console.log(customer)
        })
        document.head.appendChild(bsCss)
        document.head.appendChild(bsJs)
    }

}

export class EstoreService {
    constructor(private CART: CartItems[]) {
        EshopPayments()
    }

    public async getCart(): Promise<CartItems[]> {
        return this.CART
    }

    public async addToCart(item: CartItems): Promise<CartItems[]> {
        const inCart = this.CART.filter(indb => item.name === indb.name)
        if (inCart.length > 0) {
            inCart[0].quantity += 1
            inCart[0].amountInCents *= inCart[0].quantity
        }
        else {
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

    public async calculateTotal(option: CalculationOptionsType): Promise<any> {
        let result = 0
        if (option === 'amountInCents') {
            result = this.CART.reduce((acc, item) => acc + item.amountInCents, 0)
        }
        else {
            result = this.CART.reduce((acc, item) => acc + item.quantity, 0)
        }

        return { option: result }

    }

    public async getCustomerDetals(): Promise<CartItems[]> {
        return this.CART
    }




}
