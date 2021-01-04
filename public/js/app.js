



const weatherForm = document.querySelector('form');
const query = document.querySelector('input');
const paragraph1 = document.querySelector('#paragraph1')
const paragraph2 = document.querySelector('#paragraph2')


weatherForm.addEventListener('submit', (e)=>{ 
  e.preventDefault(); 
  paragraph1.textContent = 'Loading'
  paragraph2.textContent = ''
  fetch(`http://localhost:3001/weather?address=${query.value}`)
  .then((response)=>{
    response.json().then((data) => {
        if(data.error) {
          paragraph1.textContent = data.error
        } else {
        paragraph1.textContent = data.location
        paragraph2.textContent = data.forecast
        }
    })
  })
})