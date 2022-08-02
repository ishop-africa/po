const curencies = async () => {
    const sessionAmount = sessionStorage.getItem('poAmmount')
    if (sessionAmount) {
        return sessionAmount;
    }else {
        const data = await fetch('https://api.exchangerate.host/convert?from=USD&to=ZAR&amount=45')
        const f = await data.json()
        sessionStorage.setItem("poAmmount", f.result)
        return f;
    }
}

curencies();

// export default curencies

