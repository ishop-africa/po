(function() {
    // Set expiration to stored cache. Default 24 hours.
    var cacheExpiresHours = 24;
    // Set currency to get rates against
    var base = 'EUR';
    
    // Do not edit below
    var rates = JSON.parse(window.sessionStorage.getItem('currencyRates') || '{}');
    var now = new Date().getTime();
    var xhr;
    if (!rates.timestamp || rates.timestamp + cacheExpiresHours * 60 * 60 * 1000 <= now) {
      xhr = new XMLHttpRequest();
      xhr.open('GET', 'https://api.exchangeratesapi.io/latest?base=' + base);
      xhr.onreadystatechange = function() {
        if(xhr.readyState === XMLHttpRequest.DONE) {
          rates = JSON.parse(xhr.responseText).rates;
          rates.timestamp = now;
          sessionStorage.setItem('currencyRates', JSON.stringify(rates));
          window.dataLayer.push({
		    event: 'exchangeRates',
		    rates: rates,
            ratesType: 'fresh'
          });
        }
      };
      xhr.send();
    } else {
      window.dataLayer.push({
      	event: 'exchangeRates',
        rates: rates,
        ratesType: 'cached'
      });
    }
  })();