const amount1 = document.querySelector('#amount');
const name1 = document.querySelector('#name1');
const amount2 = document.querySelector('#amount2');
const name2 = document.querySelector('#name2');
const time = document.querySelector('#time');
const input1 = document.querySelector('#input1');
const firstCurrency = document.querySelector('#currency1');
const input2 = document.querySelector('#input2');
const secondCurrency = document.querySelector('#currency2');
let flag = 0;

// document.onload = () => {
    fetch(`https://v6.exchangerate-api.com/v6/efbba6ef7125860ab24a5742/latest/AED`)
    .then(response => response.json())
    .then(function(data) {
      time.innerHTML = data.time_last_update_utc;
      for (let elem in data.conversion_rates) {
        if (elem) {
            // firstCurrency.options[firstCurrency.selectedIndex].setAttribute('value', data.conversion_rates[elem]);
            firstCurrency.innerHTML += `<option value='${data.conversion_rates[elem]}'>${elem}</option>`;
            flag++;
            input1.value = '';
            input2.value = '';
        }   
        // if (flag > 1) {
        //     secondCurrency.removeChild(secondCurrency.options[secondCurrency.selectedIndex]);
        // }
        secondCurrency.innerHTML += `<option value="${data.conversion_rates[elem]}">${elem}</option>`;
    }
    if (secondCurrency.value == '1') {
        secondCurrency.removeChild(secondCurrency.options[0]);
    }
    })
// }

firstCurrency.onchange = () => {
    fetch(`https://v6.exchangerate-api.com/v6/efbba6ef7125860ab24a5742/latest/${firstCurrency.options[firstCurrency.selectedIndex].text}`)
    .then(response => response.json())
    .then(function(data) {
      time.innerHTML = data.time_last_update_utc;
      for (let elem in data.conversion_rates) {
        if (elem === firstCurrency.options[firstCurrency.selectedIndex].text) {
            firstCurrency.options[firstCurrency.selectedIndex].setAttribute('value', data.conversion_rates[elem]);
            flag++;
            input1.value = '';
            input2.value = '';
        }   
        if (flag > 1) {
            secondCurrency.removeChild(secondCurrency.options[secondCurrency.selectedIndex]);
        }
        secondCurrency.innerHTML += `<option value="${data.conversion_rates[elem]}">${elem}</option>`;
    }
    if (secondCurrency.value == '1') {
        secondCurrency.removeChild(secondCurrency.options[0]);
    }
    })
    .catch((error) => console.log(error));
}

// count value on choosen option
input1.addEventListener('input', e => {
    if (input1.value) {
        input2.value =  (Number(firstCurrency.value) + Number(input1.value) - 1) * Number(secondCurrency.value);
        input2.value =  Number(input2.value).toFixed(2);
        amount1.innerHTML = firstCurrency.value;
        name1.innerHTML = firstCurrency.options[firstCurrency.selectedIndex].text;
        amount2.innerHTML = input2.value;
        name2.innerHTML = secondCurrency.options[secondCurrency.selectedIndex].text;
    }
    else {
        input2.value = '';
    }
});

 setTimeout(() => {
    amount1.innerHTML = firstCurrency.value;
    name1.innerHTML = firstCurrency.options[0].text;
    amount2.innerHTML = secondCurrency.value;
    name2.innerHTML = secondCurrency.options[0].text;
}, 200);

// checks value continuously when changes option in select 2 
secondCurrency.oninput = () => { 
    if (input1.value) {
        input2.value =  (Number(firstCurrency.value) + Number(input1.value) - 1) * Number(secondCurrency.value);
        input2.value =  Number(input2.value).toFixed(2);
        amount2.innerHTML = Number(secondCurrency.value).toFixed(2);
        name2.innerHTML = secondCurrency.options[secondCurrency.selectedIndex].text;
    }
    else {
        input2.value = '';
    }
}; 
