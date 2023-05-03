const searchBox = document.getElementById('top-search');

searchBox.onsubmit = (ev) => {
    console.log('submitted top-search with', ev)
    const formData = new FormData(ev.target)
    console.log(formData)
    let location = '';
    for (const pair of formData.entries()) {
        console.log(`${pair[0]}, ${pair[1]}`);
        location = pair[1]
    }
    ev.preventDefault()

    weatherReq.open("GET", `https://api.weatherbit.io/v2.0/current?city=${location}&units=I&key=b04ee7201764489b8ec2c12568c54551&include=minutely
    `);

    weatherReq.send()
}

let quoteReq = new XMLHttpRequest();
let weatherReq = new XMLHttpRequest();
let data;

weatherReq.addEventListener("load", function (ev) {

    let quoteReq = new XMLHttpRequest();
    quoteReq.addEventListener('load', function () {
        const quoteInfo = this.responseText;
        const quotes = JSON.parse(quoteInfo);

        console.log(quoteInfo);
        console.log(quotes)
        const quote_box = document.getElementById('quote');
        var random = quotes[Math.floor(Math.random() * quotes.length)];

        console.log(random)
        quote_box.innerText = random.quote;
    });


    console.log("weather starting");
    const weatherInfo = JSON.parse(ev.target.responseText);
    console.log(weatherInfo);

    const precipitation = weatherInfo.data[0].precip;
    console.log("Precipitation: ", precipitation);
    const precip_box = document.getElementById('precip');
    precip_box.innerHTML = `Current Precipitation is ${precipitation}`;


    const temperature = weatherInfo.data[0].temp;
    console.log("Temperature: ", temperature);
    const temp_box = document.getElementById('temp')
    temp_box.innerHTML = `Current Temperature is ${temperature}`;

    const cloud_coverage = weatherInfo.data[0].clouds;
    console.log("Cloud Coverage: ", cloud_coverage);
    const cloud_box = document.getElementById('cloud')
    cloud_box.innerHTML = `Current Cloud Coverage is ${cloud_coverage}`;

    const snow = weatherInfo.data[0].snow;
    console.log("Snow: ", snow);
    const snow_box = document.getElementById('snow')
    snow_box.innerHTML = `Current Chance of Snow is ${snow}`;

    const uv = weatherInfo.data[0].uv;
    console.log("UV: ", uv);
    const uv_box = document.getElementById('uv')
    uv_box.innerHTML = `Current UV is ${uv}`;

    // SUNNY
    if (uv > 8 && temperature > 70) {
        data = JSON.stringify({
            pageSize: 25,
            page: 0,
            searchString: 'sunny'
        });
    }

    // SNOW 
    else if (precip > .2 && snow != 0) {
        data = JSON.stringify({
            pageSize: 25,
            page: 0,
            searchString: 'snowy'
        });
    }

    // RAINY
    else if (precip > .2) {
        data = JSON.stringify({
            pageSize: 25,
            page: 0,
            searchString: 'rainy'
        });
    }

    // CLOUDY 
    else if (cloud_coverage > 30) {
        data = JSON.stringify({
            pageSize: 25,
            page: 0,
            searchString: 'cloudy'
        });
    }

    // OTHERWISE 
    else {
        data = JSON.stringify({
            pageSize: 25,
            page: 0,
            searchString: 'weather'
        });
    }

    quoteReq.open('POST', 'https://quotel-quotes.p.rapidapi.com/search/quotes');
    quoteReq.setRequestHeader('content-type', 'application/json');
    quoteReq.setRequestHeader('X-RapidAPI-Key', '275c091eb4msh93ace874162b572p16d680jsne378b7e55367');
    quoteReq.setRequestHeader('X-RapidAPI-Host', 'quotel-quotes.p.rapidapi.com');

    quoteReq.send(data);
});

const quoteBox = document.getElementById('new-quote');

quoteBox.onclick = (ev) => {
    console.log("new quote");

    quoteReq.addEventListener('load', function () {
        const quoteInfo = this.responseText;
        const quotes = JSON.parse(quoteInfo);

        console.log(quoteInfo);
        console.log(quotes)
        const quote_box = document.getElementById('quote');
        var random = quotes[Math.floor(Math.random() * quotes.length)];

        console.log(random)
        quote_box.innerText = random.quote;
    });

    quoteReq.open('POST', 'https://quotel-quotes.p.rapidapi.com/search/quotes');
    quoteReq.setRequestHeader('content-type', 'application/json');
    quoteReq.setRequestHeader('X-RapidAPI-Key', '275c091eb4msh93ace874162b572p16d680jsne378b7e55367');
    quoteReq.setRequestHeader('X-RapidAPI-Host', 'quotel-quotes.p.rapidapi.com');

    quoteReq.send(data);

}

