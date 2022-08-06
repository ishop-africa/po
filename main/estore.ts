/**
 * ALL CODE IN THIS FILE WILL NEED TO BE REFACTORED AND DOCUMENTED FOR MAINTAINABILITY AND READABILITY PURPOSES.
 * 
 */
import { CartItems } from '../types/estore';
import { EshopService } from './services/eshop-service';
/**
 * @method EshopService
 * 
 * Depends on the presence of the following id on te curent page. p
 * o-payment-form. if this id doe not exists the cart will not be rendered.
 */
export const EshopPayments = async () => {


    var CART: CartItems[] = [];
    const service = new EshopService(CART)
    const shorpingCart = document.createElement("div")
    shorpingCart.className = "container"
    shorpingCart.id = "shoppingCart"
    shorpingCart.innerHTML = `
    <div class="cartContanier" id='cartContanier' data-toggle="modal" data-target="#mbr-popup-ji">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
        <path stroke-linecap="round" stroke-linejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
        </svg>
        <span id='cartTotal'></span>
    </div>
    `;
    const closeCart = document.getElementsByClassName("closeCart")
    console.log(
        closeCart.length
    )
    const rangePlus = document.createElement("input")
    rangePlus.type = "number"
    rangePlus.id = "rangePlus"
    const rangeMinus = document.createElement("input")
    rangeMinus.id = 'rangeMinus'
    rangeMinus.type = "number"

    // for development only hook these elements to the head of the page
    const eshopPaymentForm = document.getElementById("po-payment-form")
    if (eshopPaymentForm) {
        console.log("eshopPaymentForm")

        document.body.appendChild(shorpingCart)

        const cartTotal = document.getElementById('cartTotal')
        cartTotal.innerHTML = '' + service.calculateTotal('itemsInCart')
        eshopPaymentForm.classList.add('hidden')
        const link = document.getElementsByTagName("a")
        /**
         * The Login in this Section extracts information form the HTML skeleton and creates a structred object CART
         */
        for (let i = 0; i < link.length; i++) {
            if (link[i].innerText === "Order Now") {
                console.log(link[i].innerHTML)
                link[i].addEventListener('click', (e) => {
                    e.preventDefault();
                    const current = e.target as HTMLAnchorElement
                    current.parentElement
                    console.log({ parent, tage: e.target })
                    const pa = current.parentElement
                    const price = pa.parentElement.nextElementSibling.children[0].innerHTML
                    console.log(pa.parentElement.nextElementSibling.children)
                    const categores = pa.parentElement.previousElementSibling.children
                    console.log(categores)
                    const name = categores[0].innerHTML.replace(/[\n\r]/g, '').replace(';', ''); // remove \n
                    // @ts-ignore 
                    const category = categores[1].innerText
                    price.replace(" ", "")
                    const unitPrice = Math.ceil(parseInt(price.replace("R", "")))
                    console.log('striped', unitPrice)
                    service.addToCart({ name, category, unitPrice })
                    console.log(CART)
                    cartTotal.innerHTML = '' + service.calculateTotal('itemsInCart')
                    service.renderCart
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
        const cartContanier = document.getElementById('cartContanier')
        // On click on the cart Icon show the cart
        const cartItemsContainer = document.getElementById("CartItemsContainer")
        cartContanier.addEventListener('click', () => {
            eshopPaymentForm.classList.toggle('hidden')
            document.getElementById('shoppingCart').classList.add('hidden')
            document.getElementById('shop').classList.toggle('hidden')

        })

        for (let close = 0; close < closeCart.length; close++) {
            closeCart[close].addEventListener('click', () => {
                eshopPaymentForm.classList.toggle('hidden')
                document.getElementById('shoppingCart').classList.toggle('hidden')
                document.getElementById('shop').classList.toggle('hidden')
            })    // close the cart
        }
        // Renove it from Cart
        const removeFromCart = document.getElementsByClassName("removeFromCart")
        for (let r = 0; r < removeFromCart.length; r++) {
            console.log(service.getCart[r])
            const current = removeFromCart[r] as HTMLElement
            document.getElementById(current.id).addEventListener('click', (e) => {
                e.preventDefault()
                console.log(current.id)
                // @ts-ignore 
                console.log(e.target.id)
                const index = parseInt(current.id.split('_')[1])
                console.log(index)
                const currentObject = service.getCart()[index]
                console.log(currentObject)
                service.removeFromCart(currentObject)
                cartTotal.innerHTML = '' + service.calculateTotal('itemsInCart')
                service.renderCart
                window.location.reload()


            })
           
        }

        const qtyInput = document.getElementById("qtyInput")
        if (qtyInput) {
            qtyInput.addEventListener('change', (e) => {
                const current = e.target as HTMLInputElement
                const qty = current.value
                const index = current.dataset.index
                service.updateCart(parseInt(index), parseInt(qty))
                service.renderCart
                console.log(CART)
                console.log(service.calculateTotal('itemsInCart'))
                // cartTotal.innerHTML = '' + service.calculateTotal('itemsInCart')
            })
        
        // Checkout Button
        const checkoutButton = document.getElementById("checkoutButton")
        } else {
            console.log("qtyInput not found")
        }


    }
}



