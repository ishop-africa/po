// make a post request using axios to the server to get the cart items


export const YapeeResource = async (data: any, url: string, method: string) => {
    try {
        const response = await fetch(url, {
            method: method,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer  ' + data.yapeeKey
            },
            body: JSON.stringify(data)
        });
        return await response.json().then(res => res);
    } catch (error) {
        return {
            success: false,
            message: error.message
        }
    }
}