var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { initYoco } from "../yoco";
export class EshopService {
    constructor(CART) {
        this.CART = CART;
        this.session = sessionStorage.getItem('myCart') !== null;
        if (this.session) {
            this.CART = JSON.parse(sessionStorage.getItem('myCart'));
            this.renderCart;
        }
    }
    formatCamelCaseString(str) {
        return str.split(/(?=[A-Z])/).join(' ');
    }
    getCart() {
        const stored = JSON.parse(sessionStorage.getItem('myCart'));
        return this.session ? stored : this.CART;
    }
    addToCart(item) {
        return __awaiter(this, void 0, void 0, function* () {
            const inCart = this.CART.filter(indb => item.name === indb.name && item.category === indb.category);
            if (inCart.length > 0) {
                inCart[0].quantity += 1;
                inCart[0].amountInCents = inCart[0].unitPrice * inCart[0].quantity;
            }
            else {
                item.quantity = 1;
                item.amountInCents = item.unitPrice;
                this.CART.push(item);
            }
            sessionStorage.setItem('myCart', JSON.stringify(this.CART));
            return this.CART;
        });
    }
    updateCart(index, qty) {
        this.CART[index].quantity = qty;
        this.CART[index].amountInCents = this.CART[index].unitPrice * qty;
        return this.CART;
    }
    removeFromCart(item) {
        return __awaiter(this, void 0, void 0, function* () {
            this.CART = this.CART.filter(cartItem => cartItem.name !== item.name);
            sessionStorage.setItem('myCart', JSON.stringify(this.CART));
            this.renderCart;
            return this.CART;
        });
    }
    clearCart() {
        return __awaiter(this, void 0, void 0, function* () {
            this.CART = [];
            return this.CART;
        });
    }
    createCustomer(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield initYoco(data);
            return response;
        });
    }
    checkout(paymentDetails) {
        return __awaiter(this, void 0, void 0, function* () {
            return;
        });
    }
    generateDescriptionFromCartItemNames() {
        return 'A Purchase of ' + this.calculateTotal('itemsInCart') + ' items ' + ' worth ' + this.formatCurrency(this.calculateTotal('amountInCents')) + ' from  Peter Oracle Website';
    }
    getPaymentDetails(yoco) {
        return __awaiter(this, void 0, void 0, function* () {
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
            };
        });
    }
    calculateTotal(option) {
        let result = 0;
        if (option === 'amountInCents') {
            result = this.CART.reduce((acc, item) => acc + item.amountInCents, 0);
        }
        else {
            result = this.CART.reduce((acc, item) => acc + item.quantity, 0);
        }
        return result;
    }
    getCustomerDetals() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.CART;
        });
    }
    get renderCart() {
        const cartItems = this.getCart();
        const cartDiv = document.getElementById('CartItemsList');
        cartDiv.innerHTML = '';
        const subTotal = document.getElementById('subTotal');
        const total = this.calculateTotal('amountInCents');
        const Tocurrency = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'ZAR' }).format(total);
        if (subTotal) {
            subTotal.innerHTML = Tocurrency;
            if (cartItems) {
                if (cartItems.length > 0) {
                    cartItems.forEach((item, index) => {
                        const ele = document.createElement("li");
                        ele.className = "flex py-6";
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
                        cartDiv.appendChild(ele);
                    });
                }
                else {
                    const elem = document.createElement('li');
                    elem.innerHTML = "<button class='closeCart'>No items in cart - proceed to shopping</button>'";
                    cartDiv.appendChild(elem);
                }
            }
            else {
                const elem = document.createElement('li');
                elem.innerHTML = "<button class='closeCart'>No items in cart - proceed to shopping</button>'";
                cartDiv.appendChild(elem);
            }
        }
        return cartDiv;
    }
    renderPersonalDetails(data) {
        return null;
    }
    formatCurrency(amount, currency = 'ZAR') {
        return new Intl.NumberFormat('en-US', { style: 'currency', currency }).format(amount);
    }
    get emptyCart() {
        sessionStorage.removeItem('myCart');
        this.CART = [];
        this.renderCart;
        return null;
    }
}
