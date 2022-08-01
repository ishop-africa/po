const initYoco = (data) => {
    var sdk = new window.YocoSDK({
        publicKey: data.publicKey
      });
    
      // Create a new dropin form instance
      var inline = sdk.inline({
        layout: 'basic',
        amountInCents: data.amountInCents,
        metadata: data.metadata,
        customer: data.customer,
        currency: 'ZAR'
      });
      // this ID matches the id of the element we created earlier.
      inline.mount('#card-frame');
}

export default initYoco