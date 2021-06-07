console.log('Client Side JS')

const weatherForm = document.querySelector('form')
const search = document.querySelector('input[type="text"]')
const weatherLocation = document.querySelector('.weather-location')
const weatherDesc = document.querySelector('.weather-desc')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    console.log("testing")

    const location = search.value

    weatherLocation.textContent = 'loading...'
    weatherDesc.textContent = ''
    const url = `http://localhost:3000/weather?address=${location}`
    fetch(url).then((res) => {
        res.json().then((data) => {
            if (data.error){
                weatherLocation.textContent = data.error
            } else {
                console.log(data.location)
                console.log(data.forecast)
                weatherLocation.textContent = data.location
                weatherDesc.textContent = data.forecast
            }
        })
    })
    
})