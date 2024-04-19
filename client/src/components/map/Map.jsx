import { MapContainer, TileLayer } from 'react-leaflet'
import './map.scss'
import "leaflet/dist/leaflet.css";
import Pin from '../pin/Pin';

function Map({ items }) {
  let sumLat = 0;
  let sumLng = 0;

  items.forEach((item) => {
    sumLat += parseFloat(item.latitude);
    sumLng += parseFloat(item.longitude);
  });

  return (
    // <MapContainer center={items.length ===1 ? [items[0].latitude, items[0].longitude] :[52.4797, -1.90269] } zoom={1} scrollWheelZoom={false} className='map'>
    <MapContainer center={items.length === 0 ? [52.4797, -1.90269] : [sumLat / items.length, sumLng / items.length]} zoom={12} scrollWheelZoom={false} className='map'>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {items.map((item) => (
        <Pin item={item} key={item.id} />
      ))}
    </MapContainer>
  );
}


export default Map