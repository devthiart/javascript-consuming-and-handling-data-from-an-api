// CEP = Zip Code in Brazil.
const validCEP = '01001000';
const invalidCEP = '01001';
const nonexistentCEP = '01001250';

async function searchAddress(cep) {
  try {
    var consultingCEP = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
    var consultingCEPConverted = await consultingCEP.json();

    if(consultingCEPConverted.erro) {
      throw Error('CEP does not exist.');
    }
  
    return consultingCEPConverted;

  } catch(error) {
    console.log(error);
  }
}

// // Resolving a group of promises.
// let ceps = ['01001000', '01001001'];
// let consultedCeps = ceps.map((value) => searchAddress(value));

// // It can be useful for aggregating the results of multiple promises.
// // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/all
// Promise.all(consultedCeps).then(response => console.log(response));

searchAddress(validCEP);
