
import { EshopService } from "./eshop-service"
export const ButtonsService = (service: EshopService ) => {
    //   initiate an empty cart 
 
    // initiating an a new EshopService instance
  
    // the form container
    const cartPymentForm = document.getElementById("po-payment-form")
    // the cart icon trigger
    const iconContainer = document.getElementById("cartContanier")

    iconContainer.addEventListener("click", (e) => {
        e.preventDefault()
        cartPymentForm.classList.toggle("hidden")
        iconContainer.classList.add("z-10")
        disableGBWidget('disable')
    })

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


}

export const disableGBWidget = (option: string) => {
    const gbWidget = document.getElementsByTagName("div")
    for (let i = 0; i < gbWidget.length; i++) {
        if (gbWidget[i].id.startsWith("gb-widget")) {
            option === "enable" ? gbWidget[i].classList.remove("hidden") : gbWidget[i].classList.add("hidden")
        
        }
    }
    
}