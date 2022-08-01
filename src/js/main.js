// const popoverTrigger = document.querySelector('.popover-trigger');
// const popoverClose = document.querySelector('.popover-close');
// const registerForm = document.querySelector('#po-register-user');
// const popover = document.querySelector('.pop-overs');
// const paymentForm = document.querySelector('#payment-form');
// const startPopup =document.querySelector('#po-start');
// const mainCover = document.querySelector('#po-register');
// // paymentForm.classList.add('hidden');
// const userForm = document.querySelector('#user-form');
// mainCover.classList.add('hidden');
// registerForm.addEventListener('submit', (e) => {
//     e.preventDefault();
//     const empytFields=[]
//     console.log('Hello World');
//     const dformData = new FormData(document.querySelector('form'));
//     const data = {};
//     dformData.forEach((value, key) => {
//         if (value !== '') {
//         data[key] = value;
//         }
//         else {
//             empytFields.push(key);
//         }
//     }
//     );

//     if (empytFields.length > 0) {
//         alert(`Please fill in the following fields: ${empytFields.join(',   ')}`);
//     }else {
//         // TODO view YOCO form and submit data
//         // save step in case a user wants to go back
//         registerForm.classList.add('hidden');

//         paymentForm.classList.remove('hidden');

//     }
    
//     // submitData(data);

// })
// const submitData =  async (data) => {
//     const post = await fetch('http://localhost:6790/rec', {
//         method: 'POST',
//         body: JSON.stringify(data),
//         headers: {
//             'Content-Type': 'application/json'
//         }
//     });

//     const response = await post.json()
//     console.log(response);
// }
// const app = () => {
   
//     console.log('Hello World');
// }

// const initYoco = () => {
//     var sdk = new window.YocoSDK({
//         publicKey: 'pk_test_ed3c54a6gOol69qa7f45'
//       });
    
//       // Create a new dropin form instance
//       var inline = sdk.inline({
//         layout: 'basic',
//         amountInCents: 2499,
//         currency: 'ZAR'
//       });
//       // this ID matches the id of the element we created earlier.
//       inline.mount('#card-frame');
// }
// initYoco();
// app()
var requestURL = 'https://api.exchangerate.host/latest';
var request = new XMLHttpRequest();
request.open('GET', requestURL);
request.responseType = 'json';
request.send();

request.onload = function() {
  var response = request.response;
  console.log(response);
}