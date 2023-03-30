// CEP = Zip Code in Brazil.
const validCEP = '01001000';
const invalidCEP = '01001';
const nonexistentCEP = '01001250';

var consultingCEP = fetch(`https://viacep.com.br/ws/${validCEP}/json/`)
  .then(response => response.json())
  .then(
    response => {
      if(response.erro) {
        throw Error("CEP don't exist!");
      } else {
        console.log(response);
      }
    }
  )
  .catch(err => console.error(err))
  .finally(() => console.log('Request Completed.'))

console.log(consultingCEP);
