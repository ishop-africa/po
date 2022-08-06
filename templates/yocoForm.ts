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