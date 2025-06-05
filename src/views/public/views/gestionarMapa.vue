<template>
    <div>
        <input type="file" @change="uploadExcel" />
        <button @click="eliminarTodaLaTabla">Eliminar toda la tabla</button>
    </div>
</template>

<script>
/* eslint-disable */
export default {
    methods: {
        eliminarTodaLaTabla() {
            // Llamar al endpoint para limpiar la tabla
            fetch('http://147.182.163.74:3000/api/limpiar-tabla', {
                method: 'DELETE'
            })
            .then(response => response.json())
            .then(data => {
                alert(data.message); // Muestra un mensaje de éxito
            })
            .catch((error) => {
                console.error('Error al eliminar los datos:', error);
                alert('Hubo un error al limpiar la tabla');
            });
        },
        uploadExcel(event) {
            const file = event.target.files[0];
            const formData = new FormData();
            formData.append('file', file);  // Añadir el archivo a FormData

            fetch('http://147.182.163.74:3000/api/upload-excel', {
                method: 'POST',
                body: formData
            })
            .then(response => response.json())
            .then(data => {
                console.log('Success:', data);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
        }
    }
};
</script>
