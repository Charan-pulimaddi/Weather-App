// const levelContainer = document.querySelector('.datagrid');
// const leveld = document.querySelector('.datagrid');
// const apiKey = '1d888d1658352a0dc5f2f6deaebe3090';
const searchBtn = document.querySelector('#searchBtn');
const searchField = document.querySelector('#searchValue');

searchBtn.addEventListener('submit', (e) => {
  e.preventDefault();
  const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${
    searchField.value || 'vijayawada'
  }&appid=${apiKey}`;
  fetch(forecastUrl)
    .then((response) => response.json())
    .then((data) => {
      // displayHourlyForecast(data.list);
      const next24Hours = data.list.slice(0, 8);
      const aqdata = data.list[0];
      console.log(data);

      document.querySelector('#location').textContent = `${data.city.name}`;
      document.querySelector('#feel_temp').textContent = `${(
        aqdata.main.feels_like - 273.15
      ).toFixed(2)}˚C`;
      document.querySelector('#min_temp').textContent = `${(
        aqdata.main.temp_min - 273.15
      ).toFixed(2)}˚C`;
      document.querySelector('#max_temp').textContent = `${(
        aqdata.main.temp_max - 273.15
      ).toFixed(2)}˚C`;
      document.querySelector(
        '#pressure'
      ).textContent = `${aqdata.main.pressure} pas`;
      document.querySelector('#weather').textContent =
        aqdata.weather[0].description;
      document.querySelector('#temp').textContent = `${(
        aqdata.main.temp - 273.15
      ).toFixed(2)}˚C`;
      document.querySelector(
        '#wind_speed'
      ).textContent = `${aqdata.wind.speed}mph`;
      document.querySelector('#wind_deg').textContent = `${aqdata.wind.deg}˚`;
      document.querySelector('#clouds').textContent = `${aqdata.clouds.all}`;
      document.querySelector(
        '#visibility'
      ).textContent = `${aqdata.visibility}`;
      document.querySelector(
        '#humidity'
      ).textContent = `${aqdata.main.humidity}%`;
      document.querySelector('#fahr').textContent = `${(
        ((aqdata.main.temp - 273.15) * 9) / 5 +
        32
      ).toFixed(2)}F`;
      const hrs = new Date(aqdata.dt_txt).getHours();
      const img = document.querySelector('#main_img');
      console.log(hrs);

      const myFormule = new Date(
        new Date().getTime() -
          5.5 * 3600000 +
          (data.city.timezone / 3600) * 3600000
      ).getHours();

      document.querySelector(
        '#times'
      ).textContent = `${myFormule.toString()}hrs test`;
      if (
        hrs >= 6 &&
        hrs < 21 &&
        !aqdata.weather[0].description.split(' ').includes('rain')
      ) {
        img.src = './images/highlysunny.png';
      }
      if (aqdata.main.temp - 273 > 35) {
        img.src = './images/sunny.png';
      }
      if (myFormule < 6 || myFormule >= 21) {
        img.src = './images/moon.png';
      }
      if (aqdata.weather[0].description.split(' ').includes('rain')) {
        img.src = './images/rain.png';
      }

      next24Hours.forEach((item, i) => {
        const dateTime = new Date(item.dt_txt); // Convert timestamp to milliseconds
        const hour = dateTime.getHours();
        const temperature = Math.round(item.main.temp - 273.15); // Convert to Celsius
        //     <div class="level_container">
        //   <span>38˚C</span>
        //   <div class="level"></div>
        //   <span>38˚C</span>
        // </div>
        const current_layer = document.querySelectorAll('.level_container')[i];
        current_layer.querySelector(
          '#level_temp'
        ).textContent = `${temperature}˚C`;
        current_layer.querySelector('#level_time').textContent = `${hour}:00`;
        current_layer.querySelector('.level').style.height = `${
          temperature * 3
        }px`;

        // console.log(current_layer.querySelector('#level_temp'));

        // document.querySelectorAll('.level')[i].style.height = `${
        //   temperature * 4
        // }px`;
      });
    })
    .catch((error) => {
      console.error('Error fetching hourly forecast data:', error);
      alert('Error fetching hourly forecast data. Please try again.');
    });
});
