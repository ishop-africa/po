(async ()=> {
    const script = document.createElement('script');
    script.src = './estore.js'; // chnage this to a cdn version
    document.body.appendChild(script);
    console.log('From Yappee')
})()