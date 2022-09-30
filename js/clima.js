let contenedor = document.getElementById('clima-text');
let ciudad = "berazategui"


fetch("https://api.openweathermap.org/data/2.5/weather?q="+ ciudad +"&lang=es&units=metric&appid=08ff6fbd0c65927d778630d19caf7605")
    .then(response => response.json())
    .then(data => {
        //console.log(data)
        contenedor.innerHTML = `
        <span>${data.name}, ${data.sys.country}. ${data.main.temp} C° ${data.weather[0].description}</span>
        `
    })
    .catch(err => console.log("Error: ", err))