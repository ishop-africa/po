export const makePopup = () => {
    const elem = `
    <div class="popup-inner h-3/4 flex h-full justify-center md:px-24 md:pt-34 md:mt-24 lg:px:24 px-4 items-center ">
    <div class="popup-content bg-white relative rounded-lg p-3 w-full flex justify-center items-center h-full h-full p-4">
      <div class="popup-header">
        <div class="popup-title md:text-6xl lg:text-6xl text-3xl">
          <p>SIGN UP AND LEARN</p>
          <p class="px-6 py-2 text-red-400 ">18 MODERN WAYS TO MAKE MONEY ONLINE</p>
          <p class="text-right underline underline-green">FOR ONLY $45</p>
        </div>
        <button class="popup-close absolute top-0 m-3 right-0">
          <svg class="h-6 w-6 " fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd"
              d="M18.278 16.864a1 1 0 0 1-1.414 1.414l-4.829-4.828-4.828 4.828a1 1 0 0 1-1.414-1.414l4.828-4.829-4.828-4.828a1 1 0 0 1 1.414-1.414l4.829 4.828 4.828-4.828a1 1 0 1 1 1.414 1.414l-4.828 4.829 4.828 4.828z"
              clip-rule="evenodd" />
          </svg>
        </button>
       <div class="text-center flex justify-center items-center  pt-5 mt-6">
        <a class=" bg-yellow-600 text-white heartbeat rounded-lg p-3  text-3xl lg:w-1/2" href="/learn.html"> Get started here</a>
       </div>
      </div>
    </div>
  </div>
    `;
    const makeMoneyWithUs = document.getElementById('money-cta');
    if (makeMoneyWithUs) {
        const d = 'popup fixed top-0 h-screen w-screen bg-gray-100 bg-opacity-75';
        makeMoneyWithUs.className = d;
        setTimeout(() => {
            makeMoneyWithUs.classList.toggle('hidden');
        }, 1000);
        makeMoneyWithUs.innerHTML = elem;
        makeMoneyWithUs.classList.add('hidden');
        const makeMoneyWithUsClose = document.getElementsByClassName('popup-close')[0];
        makeMoneyWithUsClose.addEventListener('click', () => {
            makeMoneyWithUs === null || makeMoneyWithUs === void 0 ? void 0 : makeMoneyWithUs.classList.toggle('hidden');
        });
        return makeMoneyWithUs;
    }
};
