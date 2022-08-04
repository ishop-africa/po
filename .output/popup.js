export const makePopup = () => {
    const elem = document.createElement('div');
    elem.id = 'make-money-with-us';
    elem.classList.add('hidden');
    elem.innerHTML = `
    <div class="make-money-with-us">

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
                        Make money with us by making payments to our platform.  
                    </p>
                </div>
                <div class="make-money-with-us-body-content-form">
                    <form id="po-signup-form">
                        <div class="make-money-with-us-body-content-form-input">
                            <input type="text" name="first_name" placeholder="First Name" required>
                        </div>  
                        <div class="make-money-with-us-body-content-form-input">
                            <input type="text" name="last_name" placeholder="Last Name" required>
                        </div>
                        <div class="make-money-with-us-body-content-form-input">
                            <input type="email" name="email" placeholder="Email" required>
                        </div>
                        <div class="make-money-with-us-body-content-form-input">
                            <input type="text" name="phone" placeholder="Phone" required>
                        </div>
                        <div class="make-money-with-us-body-content-form-input">
                            <input type="text" name="description" placeholder="Description" required>
                        </div>
                        <div class="make-money-with-us-body-content-form-input">
                            <input type="text" name="affiliate" placeholder="Affiliate Token" required>
                        </div>
                        <div class="make-money-with-us-body-content-form-input">
                            <input type="submit" value="Make Payment">
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
    `;
    document.body.appendChild(elem);
    const makeMoneyWithUs = document.getElementById('make-money-with-us');
    const makeMoneyWithUsClose = document.getElementsByClassName('make-money-with-us-close')[0];
    makeMoneyWithUsClose.addEventListener('click', () => {
        makeMoneyWithUs.classList.add('hidden');
    });
    setTimeout(() => {
        makeMoneyWithUs.classList.remove('hidden');
    }, 1000);
    return makeMoneyWithUs;
};
