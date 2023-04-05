// CEP = Zip Code in Brazil.
const validCEP = '01001000';
const invalidCEP = '01001';
const nonexistentCEP = '01001250';

async function searchAddress(cep) {
  var errorMessage = document.getElementById('error');
  errorMessage.innerHTML = '';
  try {
    var consultingCEP = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
    var consultingCEPConverted = await consultingCEP.json();

    var cityInput = document.getElementById('cidade');
    var addressInput = document.getElementById('endereco');
    var stateInput = document.getElementById('estado');

    cityInput.value = consultingCEPConverted.localidade;
    addressInput.value = consultingCEPConverted.logradouro;
    stateInput.value = consultingCEPConverted.uf;

    if(consultingCEPConverted.erro) {
      throw Error('CEP does not exist.');
    }
  
    return consultingCEPConverted;

  } catch(error) {
    errorMessage.innerHTML = `<p class="erro__texto">Preencha um CEP válido.</p>`
    console.log(error);
  }
}

// // Resolving a group of promises.
// let ceps = ['01001000', '01001001'];
// let consultedCeps = ceps.map((value) => searchAddress(value));

// // It can be useful for aggregating the results of multiple promises.
// // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/all
// Promise.all(consultedCeps).then(response => console.log(response));


var cepInput = document.getElementById('cep');
cepInput.addEventListener('focusout', event => searchAddress(event.target.value) );
