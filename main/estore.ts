import { ButtonsService } from './services/buttons';
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
    poform.id = "yc-payment"
    poform.className = "yc-payment hidden"
    poform.innerHTML = poForm()
    // add audios page selector 
    const audiospage = document.getElementById("yc-store")

    if (audiospage) {
        audiospage.appendChild(poform)
        // Create an instance shopping cart icon
        const cartIcon = document.createElement("div")
        cartIcon.id = "po-cart-icon"
        cartIcon.className = "po-cart-icon"
        cartIcon.innerHTML = `<div class="cartContanier hidden" id='cartContanier' data-toggle="modal" data-target="#mbr-popup-ji">
             <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
            <span id='cartTotal'></span>
        </div>`;
        // Add the cart icon to the page and make it visible with a z-index of 23999 
        document.body.appendChild(cartIcon)
        const CART: CartItems[] = []
        // initiating an a new EshopService instance
        const service = new EshopService(CART)
        ButtonsService(service)

    

    const checkoutButton = document.getElementById("checkoutBtn")
    const cartItemsDiv = document.getElementById("CartItemsDiv")
    const personalDetailsDiv = document.getElementById("PersonalDetailsDiv")
    const paymentDiv = document.getElementById("PaymentDiv")
    if (checkoutButton) {
        //Activates the personal Details form comtainer
        checkoutButton?.addEventListener('click', (e) => {
            e.preventDefault()
            cartItemsDiv!.classList.toggle('hidden')
            personalDetailsDiv?.classList.toggle('hidden')
            // Create Personal Details Form and append to the div
            const personalDetailsForm = document.createElement("form")
            personalDetailsForm.id = "personalDetailsForm"
            // add the form to PersonalDetailsForm Div

            const PersonalDetailsCollectionForm = document.getElementById('PersonalDetailsCollectionForm')
            PersonalDetailsCollectionForm!.addEventListener('submit', (e) => {
                e.preventDefault()

                const personalDetails: any = {}
                const emptyEntries = []


                const formData = new FormData(PersonalDetailsCollectionForm as HTMLFormElement);
                // @ts-ignore
                for (const [key, value] of formData.entries()) {
                    if (value !== '') {
                        // @ts-ignore
                        personalDetails[key] = value
                    } else {
                        emptyEntries.push(key)
                    }

                }

                if (emptyEntries.length > 0) {
                    alert('Please fill in the following fields: ' + emptyEntries.join(', '))
                }
                else {
                    const customer = {
                        firstName: personalDetails['firstName'],
                        lastName: personalDetails['lastName'],
                        email: personalDetails['email'],
                        phone: personalDetails['phone'],
                    }
                    const metadata: YocoPayMetadataDto = {
                        ...customer,
                        affliate: 'no',
                        description: service.generateDescriptionFromCartItemNames() + ' Total Cost : ' +
                            service.formatCurrency(service.calculateTotal('amountInCents')),
                        shippingAddress: personalDetails['shippingAddress']

                    }
                    const amountInCents = service.calculateTotal('amountInCents') * 100
                    const description = service.generateDescriptionFromCartItemNames()
                    document.getElementById('subTotals')!.innerHTML = '' + service.formatCurrency(service.calculateTotal('amountInCents'))
                    const PaymentDiv = document.getElementById('PaymentDiv')
                    const yocoForm = document.getElementById('AddYocoForm')!
                    yocoForm.innerHTML = InLineYocoForm(service.formatCurrency(amountInCents / 100))
                    const loader = document.getElementById('po-loader-cover-container')
                    personalDetailsDiv!.className = 'bg-opacity-75'
                    const YocoData: YocoInputDto = { customer, metadata, description, amountInCents, cart: service.getCart() }
                    initYoco(YocoData, true)
                    loader!.classList.toggle('hidden')
                    setTimeout(() => {
                        personalDetailsDiv!.classList.toggle('hidden')
                        loader!.classList.toggle('hidden')
                        PaymentDiv!.classList.toggle('hidden')

                    }, 4000)


                }



            })

        })
    }
    const completeOrder = document.getElementById('orderCompleteAndDone')
    if (completeOrder) {
        const fn = document.getElementsByClassName('orderCompleteAndDone')
        for (let i = 0; i < fn.length; i++) {
            const current = fn[i] as HTMLElement
            current.addEventListener('click', (e) => {
                service.emptyCart
                window.location.reload()
            })
        }
        completeOrder.addEventListener('click', () => {
            service.emptyCart
            window.location.reload()
        })
    }

}
}



