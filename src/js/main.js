const popover = document.querySelector('.popover');
const popoverTrigger = document.querySelector('.popover-trigger');
const popoverClose = document.querySelector('.popover-close');

const submitData = (data) => {
    const xhr = new XMLHttpRequest();
    xhr.open('POST', 'https://power-players.herokuapp.com/api/v1/players');
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify(data));
    xhr.onload = () => {
        console.log(xhr.response);
    }
}
const app = () => {
    // popoverTrigger.addEventListener('click', () => {
    //     popover.classList.add('popover--active');
    // }
    // );
    // popoverClose.addEventListener('click', () => {
    //     popover.classList.remove('popover--active');
    // }
    // );
    // const form = document.querySelector('.form');
    // form.addEventListener('submit', (e) => {
    //     e.preventDefault();
    //     const data = {
    //         name: form.name.value,
    //         age: form.age.value,
    //         position: form.position.value,
    //         club: form.club.value,
    //         country: form.country.value,
    //         image: form.image.value,
    //         description: form.description.value
    //     }
    //     submitData(data);
    // }
    // )
    console.log('Hello World');
}
app()
