if ('serviceWorker' in navigator) {
  window.addEventListener('load', function() {
    navigator.serviceWorker.register('/sw.js').then(function(registration) {
      console.log('ServiceWorker registration successful with scope: ', registration.scope);
    }, function(err) {
      console.log('ServiceWorker registration failed: ', err);
    });
  });
}

function convertCurrency(amount, from, to, cb) {

  from = encodeURIComponent(from);
  to = encodeURIComponent(to);
  let query = from + '_' + to;

  let url = 'https://free.currencyconverterapi.com/api/v5/convert?q='
            + query + '&compact=y';

  let request = new Request(url, {method: 'GET'});

  fetch(request)
  .then(response => {
    //console.log(response.status);
    if (response.status === 200) {
      console.log(response);
      return response.json();
    } else {
      throw new Error('Something went wrong on api server!');
    }
  })
  .catch(error => {
    console.error(error);
  });

}

function getAllCurrencies(){
  let url = 'https://free.currencyconverterapi.com/api/v5/currencies';
  let request = new Request(url, {method: 'GET'});
  let fromDropdown = document.getElementById("from-currencies");
  let toDropdown = document.getElementById("to-currencies");
  fromDropdown.length = 0;
  toDropdown.length = 0;

  fetch(request)
  .then(response => {
    if (response.status === 200) {

      response.json().then(function(data) {
        let option;
      	for (let element in data.results)  {
          if(element ==="ALL"){
            continue;
          }
            option = document.createElement('option');
        	  option.text = element;
        	  option.value = element;
        	  toDropdown.add(option);
      	}
        for (let element in data.results)  {
          if(element ==="ALL"){
            continue;
          }
            option = document.createElement('option');
        	  option.text = element;
        	  option.value = element;
            fromDropdown.add(option);
      	}
      });
    } else {
      throw new Error('Something went wrong on api server!');
    }
  })
  .catch(error => {
    console.error(error);
  });

}

convertCurrency(10, 'USD', 'PHP', function(err, amount) {
  console.log(amount);
});

getAllCurrencies();

document.getElementById("conversion-form").addEventListener("submit", function(event){
    event.preventDefault();
    let amountc = document.getElementById("fromCurrency").value;
    let fromCurrencyc = document.getElementById("from-currencies").value;
    let toc = document.getElementById("to-currencies").value;
    convertCurrency(amountc, fromCurrencyc, toc, function(err, amount) {
      console.log(amount);
    });
});
