// CEP = Zip Code in Brazil.
const CEPsToTest = {
  'validCEP': '01001000',
  'invalidCEP': '01001',
  'nonexistentCEP': '01001250',
};

const addressInputs = {
  'street': document.getElementById('endereco'),
  'neighborhood': document.getElementById('bairro'),
  'city': document.getElementById('cidade'),
  'state': document.getElementById('estado'),
}

const errorMessage = document.getElementById('error');
const cepInput = document.getElementById('cep');
cepInput.addEventListener('focusout', event => searchAddress(event.target.value));

function setAddressForm(street, neighborhood, city, state) {
  addressInputs.street.value = street;
  addressInputs.neighborhood.value = neighborhood
  addressInputs.city.value = city;
  addressInputs.state.value = state;
}

function clearAddressForm() {
  addressInputs.street.value = '';
  addressInputs.neighborhood.value = '';
  addressInputs.city.value = '';
  addressInputs.state.value = '';
}

function setErrorMessage(message) {
  errorMessage.innerHTML = `<p class="erro__texto">${message}</p>`
}

function clearErrorMessage() {
  errorMessage.innerHTML = '';
}

async function searchAddress(cep) {
  clearErrorMessage();
  try {
    var consultingCEP = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
    var consultingCEPConverted = await consultingCEP.json();

    setAddressForm(
      consultingCEPConverted.logradouro, 
      consultingCEPConverted.bairro,
      consultingCEPConverted.localidade,
      consultingCEPConverted.uf
    );

    if(consultingCEPConverted.erro) {
      throw Error('CEP does not exist.');
    }
  
    return consultingCEPConverted;

  } catch(error) {
    setErrorMessage('Preencha um CEP válido.');
    clearAddressForm();
    console.log(error);
  }
}

// // Resolving a group of promises.
// let ceps = ['01001000', '01001001'];
// let consultedCeps = ceps.map((value) => searchAddress(value));

// // It can be useful for aggregating the results of multiple promises.
// // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/all
// Promise.all(consultedCeps).then(response => console.log(response));
