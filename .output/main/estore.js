var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { ButtonsService, disableGBWidget } from './services/buttons';
import { initYoco } from './yoco';
import { InLineYocoForm, poForm } from '../templates/index';
import { EshopService } from './services/eshop-service';
export const EshopPayments = () => __awaiter(void 0, void 0, void 0, function* () {
    const poform = document.createElement("div");
    poform.id = "po-payment-form";
    poform.className = "po-payment-form hidden";
    poform.innerHTML = poForm();
    const audiospage = document.getElementById("po-store-page");
    if (audiospage) {
        const CART = [];
        audiospage.appendChild(poform);
        const cartIcon = document.createElement("div");
        cartIcon.id = "po-cart-icon";
        cartIcon.className = "po-cart-icon";
        cartIcon.innerHTML = `<div class="cartContanier hidden" id='cartContanier' data-toggle="modal" data-target="#mbr-popup-ji">
             <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
            <span id='cartTotal'></span>
        </div>`;
        document.body.appendChild(cartIcon);
        const paymentForm = document.getElementById('po-payment-form');
        const service = new EshopService(CART);
        ButtonsService(service);
        paymentForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const formData = new FormData(document.querySelector('#po-payment-form'));
            const customer = {};
            for (const [key, value] of formData.entries()) {
                if (value !== '') {
                    customer[key] = value;
                    key.replace(' ', '_');
                    key.replace('-', '_');
                    customer[key] = value;
                }
            }
        });
        const closeCart = document.getElementsByClassName('closeCart');
        for (let close = 0; close < closeCart.length; close++) {
            closeCart[close].addEventListener('click', (e) => {
                e.preventDefault();
                paymentForm.classList.toggle('hidden');
                document.getElementById("cartContanier").classList.toggle('z-10');
                document.getElementById('menu1-be').classList.toggle('z10');
                document.getElementById('menu1-aa').classList.toggle('z10');
                document.getElementsByClassName('manyi')[0].classList.toggle('z10');
                document.getElementsByClassName('manyi')[0].classList.toggle('navbar-fixed-top');
                document.getElementById('shoppingCart').classList.toggle('hidden');
                document.getElementById('shop').classList.toggle('hidden');
                disableGBWidget('enable');
                alert('Closing cart');
            });
        }
        const removeFromCart = document.getElementsByClassName("removeFromCart");
        const cartTotal = document.getElementById('cartTotal');
        for (let r = 0; r < removeFromCart.length; r++) {
            const current = removeFromCart[r];
            document.getElementById(current.id).addEventListener('click', (e) => {
                e.preventDefault();
                const index = parseInt(current.id.split('_')[1]);
                const currentObject = service.getCart()[index];
                service.removeFromCart(currentObject);
                cartTotal.innerHTML = '' + service.calculateTotal('itemsInCart');
                service.renderCart;
                window.location.reload();
            });
        }
        const checkoutButton = document.getElementById("checkoutBtn");
        const cartItemsDiv = document.getElementById("CartItemsDiv");
        const personalDetailsDiv = document.getElementById("PersonalDetailsDiv");
        const paymentDiv = document.getElementById("PaymentDiv");
        if (checkoutButton) {
            checkoutButton === null || checkoutButton === void 0 ? void 0 : checkoutButton.addEventListener('click', (e) => {
                e.preventDefault();
                cartItemsDiv.classList.toggle('hidden');
                personalDetailsDiv === null || personalDetailsDiv === void 0 ? void 0 : personalDetailsDiv.classList.toggle('hidden');
                const personalDetailsForm = document.createElement("form");
                personalDetailsForm.id = "personalDetailsForm";
                const PersonalDetailsCollectionForm = document.getElementById('PersonalDetailsCollectionForm');
                PersonalDetailsCollectionForm.addEventListener('submit', (e) => {
                    e.preventDefault();
                    const personalDetails = {};
                    const emptyEntries = [];
                    const formData = new FormData(PersonalDetailsCollectionForm);
                    for (const [key, value] of formData.entries()) {
                        if (value !== '') {
                            personalDetails[key] = value;
                        }
                        else {
                            emptyEntries.push(key);
                        }
                    }
                    if (emptyEntries.length > 0) {
                        alert('Please fill in the following fields: ' + emptyEntries.join(', '));
                    }
                    else {
                        const customer = {
                            firstName: personalDetails['firstName'],
                            lastName: personalDetails['lastName'],
                            email: personalDetails['email'],
                            phone: personalDetails['phone'],
                        };
                        const metadata = Object.assign(Object.assign({}, customer), { affliate: 'no', description: service.generateDescriptionFromCartItemNames() + ' Total Cost : ' +
                                service.formatCurrency(service.calculateTotal('amountInCents')), shippingAddress: personalDetails['shippingAddress'] });
                        const amountInCents = service.calculateTotal('amountInCents') * 100;
                        const description = service.generateDescriptionFromCartItemNames();
                        document.getElementById('subTotals').innerHTML = '' + service.formatCurrency(service.calculateTotal('amountInCents'));
                        const PaymentDiv = document.getElementById('PaymentDiv');
                        const yocoForm = document.getElementById('AddYocoForm');
                        yocoForm.innerHTML = InLineYocoForm(service.formatCurrency(amountInCents / 100));
                        const loader = document.getElementById('po-loader-cover-container');
                        personalDetailsDiv.className = 'bg-opacity-75';
                        const YocoData = { customer, metadata, description, amountInCents, cart: service.getCart() };
                        initYoco(YocoData, true);
                        loader.classList.toggle('hidden');
                        setTimeout(() => {
                            personalDetailsDiv.classList.toggle('hidden');
                            loader.classList.toggle('hidden');
                            PaymentDiv.classList.toggle('hidden');
                        }, 4000);
                    }
                });
            });
        }
        const completeOrder = document.getElementById('orderCompleteAndDone');
        if (completeOrder) {
            const fn = document.getElementsByClassName('orderCompleteAndDone');
            for (let i = 0; i < fn.length; i++) {
                const current = fn[i];
                current.addEventListener('click', (e) => {
                    service.emptyCart;
                    window.location.reload();
                });
            }
            completeOrder.addEventListener('click', () => {
                service.emptyCart;
                window.location.reload();
            });
        }
    }
});
