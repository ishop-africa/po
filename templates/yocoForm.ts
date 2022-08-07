import { EshopService } from '../main/services/eshop-service';
import { CartItems } from '../types/estore';
export const InLineYocoForm = (amount): string =>  `
<form id="payment-form" method="POST">
  <div class="one-liner">
    <div id="card-frame">
      <!-- Yoco Inline form will be added here -->
    </div>
    <button id="pay-button">
      PAY ${amount}
    </button>
  </div>
  <p class="success-payment-message" />
</form>
`
export const ShopingOrderSuccessfull = (name: string): string => `
<div class="congrats" id="congratulations">
<div class="px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20">
  <div class="max-w-xl sm:mx-auto lg:max-w-2xl">
    <div class="flex flex-col mb-16 sm:text-center sm:mb-0">

      <div class="max-w-xl mb-10 md:mx-auto sm:text-center lg:max-w-2xl md:mb-12">
      <div class='flex justify-center items-center '>
      <img src="assets/key.gif" alt="success" class="w-24 h-24 mx-auto md:w-32 md:h-32">
      </div>
        <h2
          class="max-w-lg mb-6 font-sans text-3xl font-bold leading-none tracking-tight text-gray-900 sm:text-4xl md:mx-auto">
          Congratulations <span class="text-yellow-600" id="userName">${name}</span> Your order was processed.
        </h2>
        <p class="text-base text-gray-700 md:text-lg">
          You will receive an email with your order details shortly. in the meanime we will be preparing your order for delivery.
          your order will be delivered to you within 3-7 working days.
        </p>

      </div>
    </div>
  </div>
</div>
</div>`

export const poForm = (): string => `

<div id="cartDtails mx-3" class="cartDtails po-cart">
    <div class="CartItemsContainer" id="CartItemsContainer"></div>
</div>
<div class="relative z-10" aria-labelledby="slide-over-title" role="dialog" aria-modal="true">

    <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>

    <div class="fixed inset-0 overflow-hidden">
        <!-- CART ITEMS  -->
        <div class="absolute inset-0 overflow-hidden">
            <div class="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">

                <div class="pointer-events-auto w-screen max-w-md">

                    <!-- // Shopping Cart -->
                    <div id="CartItemsDiv"
                        class="flex   z19999 h-full flex-col overflow-y-scroll bg-white shadow-xl">
                        <div class="flex-1 overflow-y-auto py-6 px-4 sm:px-6">
                            <div class="flex items-start justify-between">
                                <h2 class="text-lg font-medium text-gray-900" id="slide-over-title">Shopping
                                    cart</h2>
                                <div class="ml-3 flex h-7 items-center">
                                    <button class="closeCart" type="button"
                                        class="-m-2 p-2 text-gray-400 hover:text-gray-500">
                                        <span class="sr-only">Close panel</span>
                                        <!-- Heroicon name: outline/x -->
                                        <svg class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none"
                                            viewBox="0 0 24 24" stroke-width="2" stroke="currentColor"
                                            aria-hidden="true">
                                            <path stroke-linecap="round" stroke-linejoin="round"
                                                d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                    </button>
                                </div>
                            </div>

                            <div class="mt-8">
                                <div class="flow-root">
                                    <ul role="list" id="CartItemsList" class="-my-6 divide-y divide-gray-200">

                                    </ul>
                                </div>
                            </div>
                        </div>

                        <div class="border-t border-gray-200 py-6 px-4 sm:px-6" data-cartNotEmpty="true">
                            <div class="flex justify-between text-base font-medium text-gray-900">
                                <p>Subtotal</p>
                                <p id="subTotal"></p>
                            </div>
                            <p class="mt-0.5 text-sm text-gray-500">Shipping and taxes calculated at checkout.
                            </p>
                            <div class="mt-6">
                                <button id="checkoutBtn"
                                    class="flex w-full items-center justify-center rounded-md border border-transparent bg-yellow-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-yellow-700">Checkout</button>
                            </div>
                            <div class="mt-6 flex justify-center text-center text-sm text-gray-500">
                                <p>
                                    or <button type="button"
                                        class="font-medium closeCart text-yellow-600 hover:text-yellow-500">Continue
                                        Shopping<span aria-hidden="true"> &rarr;</span></button>
                                </p>
                            </div>
                        </div>
                    </div>

                    <!-- // Personal Details Form here  -->
                    <div id="PersonalDetailsDiv " data-next="PersonalDetailsDiv" data-back="CartItemsDiv"
                        class=" hidden  z19999 flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                        <div class="flex-1 overflow-y-auto py-6 px-4 sm:px-6">
                            <div class="flex items-start justify-between">
                                <h2 class="text-lg font-medium text-gray-900 flex justify-center items-center"
                                    id="slide-over-title">

                                    <span>Shipping Information</span>
                                </h2>
                                <div class="ml-3 flex h-7 items-center">
                                    <button class="closeCart" type="button"
                                        class="-m-2 p-2 text-gray-400 hover:text-gray-500">
                                        <span class="sr-only">Close panel</span>
                                        <!-- Heroicon name: outline/x -->
                                        <svg class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none"
                                            viewBox="0 0 24 24" stroke-width="2" stroke="currentColor"
                                            aria-hidden="true">
                                            <path stroke-linecap="round" stroke-linejoin="round"
                                                d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                    </button>
                                </div>
                            </div>


                            <div class="mt-8">
                                <div class="flow-root" id="PersonalDetailsFormContainer">
                                    <form id="PersonalDetailsCollectionForm">
                                        <div class="col-span-6 sm:col-span-3">
                                            <label for="firstName"
                                                class="block text-sm font-medium text-gray-700">First
                                                name</label>
                                            <input type="text" name="firstName" id="firstName"
                                                placeholder="First Name"
                                                class="mt-1 focus:ring-yellow-500 focus:border-yellow-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md p-2">
                                        </div>

                                        <div class="col-span-6 sm:col-span-3">
                                            <label for="lastName"
                                                class="block text-sm font-medium text-gray-700">Last
                                                name</label>
                                            <input type="text" name="lastName" id="lastName"
                                                class="mt-1 focus:ring-yellow-500 focus:border-yellow-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md p-2"
                                                placeholder="Last Name">
                                        </div>

                                        <div class="col-span-6 sm:col-span-4">
                                            <label for="email"
                                                class="block text-sm font-medium text-gray-700">Email
                                                address</label>
                                            <input type="email" name="email" id="email" autocomplete="email"
                                                placeholder="Email Address"
                                                class="mt-1 focus:ring-yellow-500 focus:border-yellow-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md p-2">
                                        </div>

                                        <div class="col-span-6 sm:col-span-4">
                                            <label for="phone"
                                                class="block text-sm font-medium text-gray-700">Phone
                                                Number</label>
                                            <input type="phone" name="phone" id="phone" autocomplete="phone"
                                                placeholder="Phone Number"
                                                class="mt-1 focus:ring-yellow-500 focus:border-yellow-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md p-2">
                                        </div>

                                        <div>
                                            <label for="shippingAddress"
                                                class="block text-sm font-medium text-gray-700"> Shipping
                                                Address
                                            </label>
                                            <div class="mt-1">
                                                <textarea id="shippingAddress" name="shippingAddress" rows="3"
                                                    placeholder="Shipping Address"
                                                    class="shadow-sm focus:ring-yellow-500  p-3 focus:border-yellow-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md"
                                                    placeholder="your address here"></textarea>
                                            </div>
                                            <p class="mt-2 text-sm text-gray-500">Enter a valid adress to
                                                deliver your order.</p>
                                        </div>
                                        <div class="mt-6">
                                            <button id="to" type="submit"
                                                class="flex w-full items-center justify-center rounded-md border border-transparent bg-yellow-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-yellow-700">Proceed
                                                with Payment</button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>

                    </div>

                    <!-- // Payment Form Here  -->

                    <div id="PaymentDiv" data-back='PersonalDetailsDiv'
                        class=" hidden  z19999 flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                        <div class="flex-1 overflow-y-auto py-6 px-4 sm:px-6">
                            <div class="flex items-start justify-between">
                                <h2 class="text-lg font-medium text-gray-900" id="slide-over-title">
                                    <span>Make payment</span>
                                </h2>
                                <div class="ml-3 flex h-7 items-center">
                                    <button class="closeCart" type="button"
                                        class="-m-2 p-2 text-gray-400 hover:text-gray-500">
                                        <span class="sr-only">Close panel</span>
                                        <!-- Heroicon name: outline/x -->
                                        <svg class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none"
                                            viewBox="0 0 24 24" stroke-width="2" stroke="currentColor"
                                            aria-hidden="true">
                                            <path stroke-linecap="round" stroke-linejoin="round"
                                                d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                    </button>
                                </div>
                            </div>

                            <div class="mt-8">
                                <div class="flow-root">
                                    <div class="yocoform" id="AddYocoForm">

                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="border-t border-gray-200 py-6 px-4 sm:px-6" data-cartNotEmpty="true">
                            <div class="flex justify-between text-base font-medium text-gray-900">
                                <p>Subtotal</p>
                                <p id="subTotals"></p>
                            </div>

                        </div>
                    </div>

                    <!-- // Order-success div here  -->
                    <div id="OrderSuccess" data-back='OrderSuccessful'
                        class=" hidden  z19999 flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                        <div class="flex-1 overflow-y-auto py-6 px-4 sm:px-6">
                            <div class="flex items-start justify-between">
                                <h2 class="text-lg font-medium text-gray-900" id="slide-over-title">
                                    <span>Order Complete</span>
                                </h2>
                                <div class="ml-3 flex h-7 items-center">
                                    <button id="orderCompleteAndDone" type="button"
                                        class="-m-2 orderCompleteAndDone p-2 text-gray-400 hover:text-gray-500">
                                        <span class="sr-only">Close panel</span>
                                        <!-- Heroicon name: outline/x -->
                                        <svg class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none"
                                            viewBox="0 0 24 24" stroke-width="2" stroke="currentColor"
                                            aria-hidden="true">
                                            <path stroke-linecap="round" stroke-linejoin="round"
                                                d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                    </button>
                                </div>
                            </div>

                            <div class="mt-8">
                                <div class="flow-root">
                                    <div class="yocoform" id="order-success">

                                    </div>
                                    <div class="mt-6">
                                        <button
                                            class="flex w-full orderCompleteAndDone items-center justify-center rounded-md border border-transparent bg-yellow-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-yellow-700">Close</button>
                                    </div>
                                </div>
                            </div>
                        </div>


                    </div>
                </div>
            </div>
        </div>
        <!-- Personal Details  -->

    </div>
</div>
`