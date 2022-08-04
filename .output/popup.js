export const makePopup = () => {
    const elem = document.createElement('div');
    elem.id = 'make-money-with-us';
    elem.innerHTML = `
    <div class="make-money-with-us">
        <div class='cover'>
        <div class="make-money-with-us-header">
            <h1>Make Money With Us</h1>
            <div class="make-money-with-us-close">

                <i class="fas fa-times"></i>
            </div>  
        </div>
        <div class="make-money-with-us-body">

            <div class="make-money-with-us-body-content">   
                <div class="make-money-with-us-body-content-header">
                    <h2>Make Money With Us</h2>
                    <p>
                       SIGN UP AND LEARN 18 MODERN WAYS ON HOW TO MAKE MONEY ONLINE FOR ONLY $45
                    </p>
                </div>
             
            </div>
        </div>
        </div>
    </div>
    `;
    document.body.appendChild(elem);
    const makeMoneyWithUs = document.getElementById('make-money-with-us');
    const makeMoneyWithUsClose = document.getElementsByClassName('make-money-with-us-close')[0];
    makeMoneyWithUsClose.addEventListener('click', () => {
        makeMoneyWithUs === null || makeMoneyWithUs === void 0 ? void 0 : makeMoneyWithUs.classList.add('hidden');
    });
    return makeMoneyWithUs;
};
