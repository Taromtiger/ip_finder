import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import {
  validateIp,
  addTileLayer,
  getAddress,
  addOffset,
} from './helpers/index';
import icon from '../images/icon-location.png';

const ipInput = document.querySelector('.search-bar__input');
const btn = document.querySelector('.search-bar__btn');

const ipInfo = document.querySelector('#ip');
const locationInfo = document.querySelector('#location');
const timezoneInfo = document.querySelector('#timezone');
const ispInfo = document.querySelector('#isp');

btn.addEventListener('click', getData);
ipInput.addEventListener('keydown', handleKey);

/********************************************************/
//відображення карти на сторінці і додавання маркера по координатам

const markerIcon = L.icon({
  iconUrl: icon,
  iconSize: [30, 30],
});

const mapArea = document.querySelector('.map');
const map = L.map(mapArea, {
  center: [49.553292, 25.59478],
  zoom: 13,
});

addTileLayer(map);
L.marker([49.553292, 25.59478], { icon: markerIcon }).addTo(map);
/********************************************************/

/********************************************************/
// функція отримання даних із сервера і перетворення їх у формат json
function getData() {
  if (validateIp(ipInput.value)) {
    getAddress(ipInput.value).then(setInfo);
  }
}
/********************************************************/

/********************************************************/
// функція отримання даних по натисненні кнопки Enter
function handleKey(e) {
  if (e.key === 'Enter') {
    getData();
  }
}
/********************************************************/

/********************************************************/
// функція виводу інформації із сервера в DOM елементи на сторінці

function setInfo(mapData) {
  const { lat, lng, country, region, timezone } = mapData.location;

  ipInfo.innerText = mapData.ip;
  locationInfo.innerText = country + ' ' + region;
  timezoneInfo.innerText = timezone;
  ispInfo.innerText = mapData.isp;

  map.setView([lat, lng]);
  L.marker([lat, lng], { icon: markerIcon }).addTo(map);

  if (matchMedia('(max-width: 1023px)').matches) {
    addOffset(map);
  }
}
/********************************************************/

/********************************************************/
// додає початкову точку на карту
document.addEventListener('DOMContentLoaded', () => {
  getAddress('102.22.22.1').then(setInfo);
});
