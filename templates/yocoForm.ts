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