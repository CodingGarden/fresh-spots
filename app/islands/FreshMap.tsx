/** @jsx h */
import { h } from "preact";
import { useEffect, useRef } from "preact/hooks";

// TODO: less hacks... probably an external pure SPA we load dynamically

const mapElements = `
<link rel="stylesheet" href="https://unpkg.com/leaflet@1.8.0/dist/leaflet.css" integrity="sha512-hoalWLoI8r4UszCkZ5kL8vayOGVae1oxXe/2A4AO6J9+580uKHDO3JdHb7NzwwzK5xr/Fs0W40kiNHxM9vyTtQ==" crossorigin=""/>
<div id="map" style="width: 180px; height: 180px"></div>`;

export default function FreshMap() {
  const div = useRef(null);
  useEffect(() => {
    console.log('USE EFFECT IS RUNNING...');
    // @ts-ignore
    div.current.innerHTML = mapElements;
    const leafletScript = document.createElement('script');
    leafletScript.src = "https://unpkg.com/leaflet@1.8.0/dist/leaflet.js";
    document.body.appendChild(leafletScript);
    leafletScript.addEventListener('load', () => {
      // @ts-ignore
      console.log(L);
      const script = document.createElement('script');
      const textNode = document.createTextNode(`
      var map = L.map('map').setView([51.505, -0.09], 13);
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '© OpenStreetMap'
      }).addTo(map);
      var marker = L.marker([51.5, -0.09]).addTo(map);
      `);
      script.appendChild(textNode);
      document.body.appendChild(script);
    });
  }, [div]);
  return (
    <div ref={div}>
    </div>
  );
}
