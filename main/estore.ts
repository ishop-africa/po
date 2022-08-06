import { YocoInputDto, YocoPayMetadataDto } from './../types/yoco.d';
/**
 * ALL CODE IN THIS FILE WILL NEED TO BE REFACTORED AND DOCUMENTED FOR MAINTAINABILITY AND READABILITY PURPOSES.
 * 
 */
import { CartItems, PersonalDetailsForm } from '../types/estore';
import { EshopService } from './services/eshop-service';
import { initYoco } from './yoco';
import { InLineYocoForm } from '../templates/index';
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
        // Checkout Slide In Div Actions and Styling 
        const checkoutButton = document.getElementById("checkoutBtn")
        const cartItemsDiv = document.getElementById("CartItemsDiv")
        const personalDetailsDiv = document.getElementById("PersonalDetailsDiv")
        const paymentDiv = document.getElementById("PaymentDiv")
        if (checkoutButton) {
            //Activates the personal Details form comtainer
            checkoutButton?.addEventListener('click', (e) => {
                e.preventDefault()
                cartItemsDiv.classList.toggle('hidden')
                personalDetailsDiv.classList.toggle('hidden')
                // Create Personal Details Form and append to the div
                const personalDetailsForm = document.createElement("form")
                personalDetailsForm.id = "personalDetailsForm"
                // add the form to PersonalDetailsForm Div
                const PersonalDetailsFormContainer = document.getElementById('PersonalDetailsFormContainer')

                const personalDataFormData: PersonalDetailsForm[] = [
                    {
                        name: "firstName", type: "text",
                    },
                    {
                        name: "LastName", type: "text",
                    },
                    {
                        name: "email", type: "email",
                    },
                    {
                        name: "phone", type: 'text'
                    },
                    {
                        name: "shippingAdress", type: 'textArea'
                    }
                ]
                const PersonalDetailsCollectionForm = document.getElementById('PersonalDetailsCollectionForm')


                PersonalDetailsCollectionForm.addEventListener('submit', (e) => {
                    e.preventDefault()
                    const formInputs = document.getElementsByTagName("input")
                    const formTextAreas = document.getElementsByTagName("textarea")
                    const personalDetails = {}
                    const emptyEntries = []
                    for (let i = 0; i < formInputs.length; i++) {
                        if (formInputs.item(i).value !== '') {
                            personalDetails[formInputs.item(i).name] = formInputs.item(i).value
                        } else {
                            emptyEntries.push(formInputs.item(i).name)
                        }
                    }

                    for (let i = 0; i < formTextAreas.length; i++) {
                        if (formTextAreas.item(i).value !== '') {
                            personalDetails[formTextAreas.item(i).name] = formTextAreas.item(i).value
                        } else {
                            emptyEntries.push(formTextAreas.item(i).name)
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
                            description: 'Shopping For : ' + service.generateDescriptionFromCartItemNames() + ' Total Cost : ' +
                                service.formatCurrency(service.calculateTotal('amountInCents')),
                            shippingAddress: personalDetails['shippingAddress']

                        }
                        const amountInCents = service.calculateTotal('amountInCents') * 100
                        const description = service.generateDescriptionFromCartItemNames()
                        document.getElementById('subTotals').innerHTML = '' + service.formatCurrency(service.calculateTotal('amountInCents'))
                        const PaymentDiv = document.getElementById('PaymentDiv')
                        const yocoForm = document.getElementById('AddYocoForm')
                        yocoForm.innerHTML = InLineYocoForm(service.formatCurrency(amountInCents / 100))
                        const loader = document.getElementById('po-loader-cover-container')
                        personalDetailsDiv.className = 'bg-opacity-75'
                        const YocoData: YocoInputDto = { customer, metadata, description, amountInCents }
                        const yoco = initYoco(YocoData, true)
                        loader.classList.toggle('hidden')
                        setTimeout(() => {
                            personalDetailsDiv.classList.toggle('hidden')
                            loader.classList.toggle('hidden')
                            PaymentDiv.classList.toggle('hidden')

                        }, 4000)


                    }



                })

            })
        }
        const completeOrder = document.getElementById('orderCompleteAndDone')
        if (completeOrder) {
            completeOrder.addEventListener('click', () => {
                service.emptyCart
                window.location.reload()
            })
        }

    }
}




