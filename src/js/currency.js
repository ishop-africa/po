const curencies = async () => {
    const data = await fetch('https://api.exchangerate.host/convert?from=USD&to=ZAR&amount=45')
    const f = await data.json()
    return f;
}

export default curencies