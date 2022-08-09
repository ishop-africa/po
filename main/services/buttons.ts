import { CartItems } from "../../types/estore"
import { EshopService } from "./eshop-service"

export const ButtonsService = () => {
    //   initiate an empty cart 
    const CART: CartItems[] = []
    // initiating an a new EshopService instance
    const service = new EshopService(CART)
    // the form container
    const cartPymentForm = document.getElementById("po-payment-form")
    // the cart icon trigger
    const iconContainer = document.getElementById("cartContanier")

    iconContainer.addEventListener("click", (e) => {
        e.preventDefault()
        cartPymentForm.classList.toggle("hidden")
        iconContainer.classList.add("z-10")
    })

    const cartTotal = document.getElementById('cartTotal')!
    cartTotal.innerHTML = '' + service.calculateTotal('itemsInCart')
    const link = document.getElementsByTagName("a")
    for (let i = 0; i < link.length; i++) {
        link[i].addEventListener('click', (e) => {
            e.preventDefault();
            const current = e.target as HTMLAnchorElement
            current.parentElement
            const pa = current.parentElement!
            const price = pa.parentElement!.nextElementSibling!.children[0].innerHTML
            const categores = pa.parentElement!.previousElementSibling!.children

            const name = categores[0].innerHTML.replace(/[\n\r]/g, '').replace(';', ''); // remove \n
            // @ts-ignore 
            const category = categores[1].innerText
            price.replace(" ", "")
            const unitPrice = Math.ceil(parseInt(price.replace("R", "")))
            service.addToCart({ name, category, unitPrice })
            cartTotal.innerHTML = '' + service.calculateTotal('itemsInCart')
            service.renderCart
            // eshopPaymentForm.classList.toggle('hidden')
        })
    }


}