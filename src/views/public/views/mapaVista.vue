<template>
  <div>
    <div id="map" style="width: 100%; height: 100vh;"></div>
  </div>
</template>

<script>
/* eslint-disable no-undef */
import 'leaflet/dist/leaflet.css'; 
import axios from 'axios';
import L from 'leaflet'; // Importar Leaflet

export default {
  data() {
    return {
      info: null,
      map: null,
      marker: null,
      currentId: null, // Para rastrear el id actual
    };
  },
  mounted() {
    this.loadMap();
    this.fetchData(this.$route.params.id); // Llamar inicialmente con el id de la URL
  },
  watch: {
    '$route.params.id'(newId) {
      // Solo llamar fetchData si el id ha cambiado
      if (newId !== this.currentId) {
        this.fetchData(newId);
      }
    },
  },
  methods: {
    // Cargar el mapa solo una vez con Leaflet
    loadMap() {
      if (!this.map) {
        this.map = L.map('map').setView([-33.4489, -70.6693], 18); // Centro de Santiago

        // Agregar un "tile layer" de OpenStreetMap
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(this.map);
      }
    },

    // Obtener datos del servidor
    fetchData(id) {
      this.currentId = id; // Guardar el id actual
      axios
        .get(`http://147.182.163.74:3000/api/mapa/${id}`)
        .then((response) => {
          this.info = response.data;
          this.addMarker(this.info.Latitud, this.info.Longitud);
        })
        .catch((error) => {
          console.error('Error al obtener los datos', error);
        });
    },

    // Añadir marcador en el mapa usando Leaflet con ícono rojo
    addMarker(lat, lng) {
      const position = [parseFloat(lat), parseFloat(lng)];

      // Crear un icono rojo personalizado
      const redIcon = L.icon({
        iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',  // URL del icono predeterminado
        iconSize: [25, 41],  // Tamaño del ícono
        iconAnchor: [12, 41],  // Puntos de anclaje
        popupAnchor: [1, -34],  // Donde se coloca el popup
        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',  // Sombra del marcador
        shadowSize: [41, 41],  // Tamaño de la sombra
      });

      if (this.marker) {
        this.marker.setLatLng(position); // Actualizar la posición si el marcador ya existe
      } else {
        this.marker = L.marker(position, { icon: redIcon }).addTo(this.map); // Usar el icono rojo
      }

      // Añadir un popup al marcador con la información
      this.marker.bindPopup(`
        <div>
          <p>ID: ${this.info.ID}</p>
          <p>Nombre Sanitaria: ${this.info.nombre_sanitaria}</p>
          <p>Localidad: ${this.info.Localidad}</p>
          <p>Rut Empresa: ${this.info.RutEmpresa}</p>
          <p>Calle: ${this.info.Calle}</p>
          <p>Número: ${this.info.Numero}</p>
          <p>Piso: ${this.info.Piso}</p>
          <p>Departamento: ${this.info.Departamento}</p>
          <p>Block: ${this.info.Block}</p>
          <p>Población/Villa: ${this.info.PoblacionVilla}</p>
          <p>Longitud: ${this.info.Longitud}</p>
          <p>Latitud: ${this.info.Latitud}</p>
          <p>Región: ${this.info.region_nombre}</p>
          <p>Comuna: ${this.info.comuna_name}</p>
        </div>
      `).openPopup();

      this.map.setView(position, 18); // Centrar el mapa en el marcador
    },
  },
};
</script>

<style scoped>
/* Añadir estos estilos a tu archivo de estilo */
html, body, #app {
  height: 100%;
  margin: 0;
}

#map {
  width: 100%;
  height: 100%; /* Asegurarse de que ocupe toda la altura disponible */
}
</style>
