export const curencies = async () => {
    const sessionAmount = sessionStorage.getItem('poAmmount')
    if (sessionAmount) {
        console.log(sessionAmount)
        return sessionAmount;
    }else {
        const data = await fetch('https://api.exchangerate.host/convert?from=USD&to=ZAR&amount=45')
        const f = await data.json()
        sessionStorage.setItem("poAmmount", f.result)
        console.log(sessionAmount)
        window.location.reload()
        return f;
    }
  
}
