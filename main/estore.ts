import { YocoInputDto, YocoPayMetadataDto } from './../types/yoco.d';
/**
 * ALL CODE IN THIS FILE WILL NEED TO BE REFACTORED AND DOCUMENTED FOR MAINTAINABILITY AND READABILITY PURPOSES.
 * 
 */
import { CartItems, PersonalDetailsForm } from '../types/estore';
import { initYoco } from './yoco';
import { InLineYocoForm, poForm } from '../templates/index';
import { PaymentsService } from './payment-auth';
import { auth } from './key';
import { EshopService } from './services/eshop-service';
/**
 * @method EshopService
 * 
 * Depends on the presence of the following id on te curent page. p
 * o-payment-form. if this id doe not exists the cart will not be rendered.
 */
export const EshopPayments = async () => {
    const poform = document.createElement("div")
    poform.id = "po-payment-form"
    poform.className = "po-payment-form hidden"
    poform.innerHTML = poForm()
    // add audios page selector 
    const audiospage = document.getElementById("po-store-page")
    
    if(audiospage){
        audiospage.appendChild(poform)
        // Create an instance shopping cart icon
        const cartIcon = document.createElement("div")
        cartIcon.id = "po-cart-icon"
        cartIcon.className = "po-cart-icon"
        cartIcon.innerHTML = `<div class="cartContanier" id='cartContanier' data-toggle="modal" data-target="#mbr-popup-ji">
             <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
            <span id='cartTotal'></span>
        </div>`;
        // Add the cart icon to the page and make it visible with a z-index of 23999 
        document.body.appendChild(cartIcon)
   
        // make the cart icon clickable and open the cart modal when clicked 
        cartIcon.addEventListener("click", () => {

        })
    }
    // const modal = document.getElementById("yastore")
    // if (modal) { modal.parentNode!.insertBefore(poform, modal.nextSibling) }

    // const eshopPaymentForm = document.getElementById("po-payment-form")

    // const closeCart = document.getElementsByClassName("closeCart")
    // var CART: CartItems[] = [];
    // const service = new EshopService(CART)

    // for development only hook these elements to the head of the page

    // if (eshopPaymentForm) {
    //     const shorpingCart = document.createElement("div")
    //     shorpingCart.className = "container"
    //     shorpingCart.id = "shoppingCart"
    //     shorpingCart.innerHTML = `
    // <div class="cartContanier" id='cartContanier' data-toggle="modal" data-target="#mbr-popup-ji">
    //     <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
    //     <path stroke-linecap="round" stroke-linejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
    //     </svg>
    //     <span id='cartTotal'></span>
    // </div>
    // `;
      

    //     document.body.appendChild(shorpingCart)


    //     const cartTotal = document.getElementById('cartTotal')!
    //     cartTotal.innerHTML = '' + service.calculateTotal('itemsInCart')
    //     eshopPaymentForm.classList.add('hidden')
    //     const link = document.getElementsByTagName("a")
    //     /**
    //      * The Login in this Section extracts information form the HTML skeleton and creates a structred object CART
    //      */
    //     for (let i = 0; i < link.length; i++) {
    //         if (link[i].innerText === "Order Now") {
    //             link[i].addEventListener('click', (e) => {
    //                 e.preventDefault();
    //                 const current = e.target as HTMLAnchorElement
    //                 current.parentElement
    //                 const pa = current.parentElement!
    //                 const price = pa.parentElement!.nextElementSibling!.children[0].innerHTML
    //                 const categores = pa.parentElement!.previousElementSibling!.children

    //                 const name = categores[0].innerHTML.replace(/[\n\r]/g, '').replace(';', ''); // remove \n
    //                 // @ts-ignore 
    //                 const category = categores[1].innerText
    //                 price.replace(" ", "")
    //                 const unitPrice = Math.ceil(parseInt(price.replace("R", "")))
    //                 service.addToCart({ name, category, unitPrice })
    //                 cartTotal.innerHTML = '' + service.calculateTotal('itemsInCart')
    //                 service.renderCart
    //                 // eshopPaymentForm.classList.toggle('hidden')
    //             })
    //         } else if (link[i].innerText === "Order Book Now") {
    //             // console.log(link[i].parentElement.nextSibling)
    //             link[i].addEventListener('click', (e) => {
    //                 e.preventDefault()
    //                 const current = e.target as HTMLAnchorElement
    //                 current.parentElement
    //                 const priceTag = current.parentElement!.previousElementSibling
    //                 const titleTag = priceTag!.previousElementSibling
    //                 let itemTitle = []
    //                 for (let i = 0; i < titleTag!.children.length; i++) {
    //                     // @ts-ignore 
    //                     itemTitle.push(titleTag.children[i].innerText)
    //                 }
    //                 const category = itemTitle[itemTitle.length - 1]
    //                 itemTitle.splice(-1, 1)
    //                 const name = itemTitle.join(" ")
    //                 // @ts-ignore 
    //                 const unitPrice = parseInt(priceTag.innerText.replace("Price: R", ""))
    //                 service.addToCart({ name, category, unitPrice })
    //                 cartTotal.innerHTML = '' + service.calculateTotal('itemsInCart')
    //                 service.renderCart

    //             })
    //         }
    //     }
    //     eshopPaymentForm.addEventListener('submit', (e) => {
    //         e.preventDefault();
    //         const formData = new FormData(document.querySelector('#po-payment-form') as HTMLFormElement);
    //         const customer = {}
    //         // @ts-ignore
    //         for (const [key, value] of formData.entries()) {
    //             if (value !== '') {
    //                 // @ts-ignore
    //                 customer[key] = value
    //                 key.replace(' ', '_')
    //                 key.replace('-', '_')
    //                 // @ts-ignore 
    //                 customer[key] = value
    //             }
    //         }
    //         //console.log(customer)
    //     })
    //     const cartContanier = document.getElementById('cartContanier')!
    //     // On click on the cart Icon show the cart
    //     const cartItemsContainer = document.getElementById("CartItemsContainer")
    //     cartContanier.addEventListener('click', () => {
    //         eshopPaymentForm.classList.toggle('hidden')
    //         document.getElementById('shoppingCart')!.classList.add('hidden')
    //         document.getElementById('menu1-be')!.classList.toggle('z10')
    //         document.getElementsByClassName('manyi')[0]!.classList.toggle('z10')
    //         document.getElementsByClassName('manyi')[0]!.classList.toggle('navbar-fixed-top')
    //         document.getElementById('shop')!.classList.toggle('hidden')

    //     })

    //     for (let close = 0; close < closeCart.length; close++) {
    //         closeCart[close].addEventListener('click', () => {
    //             eshopPaymentForm.classList.toggle('hidden')
    //             document.getElementById('menu1-be')!.classList.toggle('z10')
    //             document.getElementById('menu1-aa')!.classList.toggle('z10')
    //             document.getElementsByClassName('manyi')[0].classList.toggle('z10')
    //             document.getElementsByClassName('manyi')[0].classList.toggle('navbar-fixed-top')
    //             document.getElementById('shoppingCart')!.classList.toggle('hidden')
    //             document.getElementById('shop')!.classList.toggle('hidden')
    //         })    // close the cart
    //     }
    //     // Renove it from Cart
    //     const removeFromCart = document.getElementsByClassName("removeFromCart")
    //     for (let r = 0; r < removeFromCart.length; r++) {
    //         //console.log(service.getCart[r])
    //         const current = removeFromCart[r] as HTMLElement
    //         document.getElementById(current.id)!.addEventListener('click', (e) => {
    //             e.preventDefault()
    //             //console.log(current.id)
    //             // @ts-ignore 
    //             //console.log(e.target.id)
    //             const index = parseInt(current.id.split('_')[1])
    //             //console.log(index)
    //             const currentObject = service.getCart()[index]
    //             //console.log(currentObject)
    //             service.removeFromCart(currentObject)
    //             cartTotal.innerHTML = '' + service.calculateTotal('itemsInCart')
    //             service.renderCart
    //             window.location.reload()
    //         })
    //     }
    //     // Checkout Slide In Div Actions and Styling 
    //     const checkoutButton = document.getElementById("checkoutBtn")
    //     const cartItemsDiv = document.getElementById("CartItemsDiv")
    //     const personalDetailsDiv = document.getElementById("PersonalDetailsDiv")
    //     const paymentDiv = document.getElementById("PaymentDiv")
    //     if (checkoutButton) {
    //         //Activates the personal Details form comtainer
    //         checkoutButton?.addEventListener('click', (e) => {
    //             e.preventDefault()
    //             cartItemsDiv!.classList.toggle('hidden')
    //             personalDetailsDiv?.classList.toggle('hidden')
    //             // Create Personal Details Form and append to the div
    //             const personalDetailsForm = document.createElement("form")
    //             personalDetailsForm.id = "personalDetailsForm"
    //             // add the form to PersonalDetailsForm Div

    //             const PersonalDetailsCollectionForm = document.getElementById('PersonalDetailsCollectionForm')
    //             PersonalDetailsCollectionForm!.addEventListener('submit', (e) => {
    //                 e.preventDefault()

    //                 const personalDetails: any = {}
    //                 const emptyEntries = []


    //                 const formData = new FormData(PersonalDetailsCollectionForm as HTMLFormElement);
    //                 // @ts-ignore
    //                 for (const [key, value] of formData.entries()) {
    //                     if (value !== '') {
    //                         // @ts-ignore
    //                         personalDetails[key] = value
    //                     } else {
    //                         emptyEntries.push(key)
    //                     }

    //                 }

    //                 if (emptyEntries.length > 0) {
    //                     alert('Please fill in the following fields: ' + emptyEntries.join(', '))
    //                 }
    //                 else {
    //                     const customer = {
    //                         firstName: personalDetails['firstName'],
    //                         lastName: personalDetails['lastName'],
    //                         email: personalDetails['email'],
    //                         phone: personalDetails['phone'],
    //                     }
    //                     const metadata: YocoPayMetadataDto = {
    //                         ...customer,
    //                         affliate: 'no',
    //                         description: service.generateDescriptionFromCartItemNames() + ' Total Cost : ' +
    //                             service.formatCurrency(service.calculateTotal('amountInCents')),
    //                         shippingAddress: personalDetails['shippingAddress']

    //                     }
    //                     const amountInCents = service.calculateTotal('amountInCents') * 100
    //                     const description = service.generateDescriptionFromCartItemNames()
    //                     document.getElementById('subTotals')!.innerHTML = '' + service.formatCurrency(service.calculateTotal('amountInCents'))
    //                     const PaymentDiv = document.getElementById('PaymentDiv')
    //                     const yocoForm = document.getElementById('AddYocoForm')!
    //                     yocoForm.innerHTML = InLineYocoForm(service.formatCurrency(amountInCents / 100))
    //                     const loader = document.getElementById('po-loader-cover-container')
    //                     personalDetailsDiv!.className = 'bg-opacity-75'
    //                     const YocoData: YocoInputDto = { customer, metadata, description, amountInCents, cart: service.getCart() }
    //                     initYoco(YocoData, true)
    //                     loader!.classList.toggle('hidden')
    //                     setTimeout(() => {
    //                         personalDetailsDiv!.classList.toggle('hidden')
    //                         loader!.classList.toggle('hidden')
    //                         PaymentDiv!.classList.toggle('hidden')

    //                     }, 4000)


    //                 }



    //             })

    //         })
    //     }
    //     const completeOrder = document.getElementById('orderCompleteAndDone')
    //     if (completeOrder) {
    //         const fn = document.getElementsByClassName('orderCompleteAndDone')
    //         for (let i = 0; i < fn.length; i++) {
    //             const current = fn[i] as HTMLElement
    //             current.addEventListener('click', (e) => {
    //                 service.emptyCart
    //                 window.location.reload()
    //             })
    //         }
    //         completeOrder.addEventListener('click', () => {
    //             service.emptyCart
    //             window.location.reload()
    //         })
    //     }

    // }
}



