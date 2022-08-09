import { CartItems } from "../../types/estore"
import { EshopService } from "./eshop-service"

export const ButtonsService = (service: EshopService) => {
    //   initiate an empty cart 

    // the form container
    const cartPymentForm = document.getElementById("yc-payment")
    // the cart icon trigger
    const iconContainer = document.getElementById("cartContanier")

    // iconContainer.addEventListener("click", (e) => {
    //     e.preventDefault()
    //     console.log(cartPymentForm)
    //     iconContainer.classList.toggle("z-10")
    // })

    const cartTotal = document.getElementById('cartTotal')!
    cartTotal.innerHTML = '' + service.calculateTotal('itemsInCart')
    const link = document.getElementsByTagName("a")
    for (let i = 0; i < link.length; i++) {
        if (link[i].innerText === "Order Now") {
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
        } else if (link[i].innerText === "Order Book Now") {
            // console.log(link[i].parentElement.nextSibling)
            link[i].addEventListener('click', (e) => {
                e.preventDefault()
                const current = e.target as HTMLAnchorElement
                current.parentElement
                const priceTag = current.parentElement!.previousElementSibling
                const titleTag = priceTag!.previousElementSibling
                let itemTitle = []
                for (let i = 0; i < titleTag!.children.length; i++) {
                    // @ts-ignore 
                    itemTitle.push(titleTag.children[i].innerText)
                }
                const category = itemTitle[itemTitle.length - 1]
                itemTitle.splice(-1, 1)
                const name = itemTitle.join(" ")
                // @ts-ignore 
                const unitPrice = parseInt(priceTag.innerText.replace("Price: R", ""))
                service.addToCart({ name, category, unitPrice })
                cartTotal.innerHTML = '' + service.calculateTotal('itemsInCart')
                service.renderCart

            })
        }
    }
    cartPymentForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const formData = new FormData(document.querySelector('#yc-payment') as HTMLFormElement);
        const customer = {}
        // @ts-ignore
        for (const [key, value] of formData.entries()) {
            if (value !== '') {
                // @ts-ignore
                customer[key] = value
                key.replace(' ', '_')
                key.replace('-', '_')
                // @ts-ignore 
                customer[key] = value
            }
        }
        //console.log(customer)
    })
    const cartContanier = document.getElementById('cartContanier')!
    // On click on the cart Icon show the cart
    const cartItemsContainer = document.getElementById("CartItemsContainer")
    cartContanier.addEventListener('click', () => {
        cartPymentForm.classList.toggle('hidden')
        iconContainer.classList.toggle("z-10")

    })
    const closeCart = document.getElementsByClassName('closeCart')
    for (let close = 0; close < closeCart.length; close++) {
        closeCart[close].addEventListener('click', () => {
            cartPymentForm.classList.toggle('hidden')
            iconContainer.classList.toggle("z-10")
           
        })    
    }


}