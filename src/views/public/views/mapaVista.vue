<template>
  <div>
    <div id="map" style="width: 100%; height: 100vh;"></div>
  </div>
</template>

<script>
/* eslint-disable */
import axios from 'axios';

export default {
  data() {
    return {
      info: null,
      map: null,
      marker: null,
      google: null
    };
  },
  mounted() {
    this.loadMap();
    const id = this.$route.params.id; // Obtenemos el ID de los parámetros de la URL
    this.fetchData(id);
  },
  methods: {
    // Cargar el mapa
    loadMap() {
      const mapOptions = {
        center: { lat: -33.4489, lng: -70.6693 }, // Centro de Santiago
        zoom: 18,
      };
      this.map = new google.maps.Map(document.getElementById('map'), mapOptions);
    },

    // Obtener datos del servidor
    fetchData(id) {
      axios
        .get(`http://localhost:3000/api/mapa/${id}`)
        .then((response) => {
          this.info = response.data;
          this.addMarker(this.info.Latitud, this.info.Longitud);
        })
        .catch((error) => {
          console.error('Error al obtener los datos', error);
        });
    },

    // Añadir marcador en el mapa
    addMarker(lat, lng) {
      const position = { lat: parseFloat(lat), lng: parseFloat(lng) };
      this.marker = new google.maps.Marker({
        position,
        map: this.map,
        title: 'Ubicación',
      });

      // Añadir un evento para mostrar la información al hacer clic
      const infowindow = new google.maps.InfoWindow({
        content: `<div>
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
        </div>`,
      });

      this.marker.addListener('click', () => {
        infowindow.open(this.map, this.marker);
      });

      this.map.setCenter(position); // Centrar el mapa en el marcador
    },
  },
};
</script>

<style scoped>
#map {
  width: 100%;
  height: 500px;
}
.info {
  margin-top: 20px;
}
</style>
