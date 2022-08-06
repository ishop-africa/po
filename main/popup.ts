export const makePopup = () => {
    
    const elem = `
    <div class="popup-inner  ">
    <div class="popup-content ">
      <div class="popup-header">
        <div class="popup-title ">
          <p class='sign-up'>SIGN UP AND LEARN</p>
          <p class=" red-txt  ">18 MODERN WAYS TO MAKE MONEY ONLINE</p>
          <p class="ltitle">FOR ONLY $45</p>
        </div>
        <button class="popup-close ">
          <svg class="po-close-icon " fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd"
              d="M18.278 16.864a1 1 0 0 1-1.414 1.414l-4.829-4.828-4.828 4.828a1 1 0 0 1-1.414-1.414l4.828-4.829-4.828-4.828a1 1 0 0 1 1.414-1.414l4.829 4.828 4.828-4.828a1 1 0 1 1 1.414 1.414l-4.828 4.829 4.828 4.828z"
              clip-rule="evenodd" />
          </svg>
        </button>
       <div class="po-started-btn">
        <a class=" po-btn-link heartbeat" href="/learn.html"> Get started here</a>
       </div>
      </div>
    </div>
  </div>
    `;

    const makeMoneyWithUs = document.getElementById('money-cta');
   
    if (makeMoneyWithUs) {
        setTimeout(() => {
            makeMoneyWithUs.classList.toggle('hidden');
        }, 1000);
        makeMoneyWithUs.innerHTML = elem
        makeMoneyWithUs.classList.add('hidden');
        const makeMoneyWithUsClose = document.getElementsByClassName('popup-close')[0];
        makeMoneyWithUsClose.addEventListener('click', () => {
            makeMoneyWithUs?.classList.toggle('hidden');
        }
        );
        return makeMoneyWithUs;
    }

}
