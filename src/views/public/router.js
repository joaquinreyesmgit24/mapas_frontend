import mapaVista from './views/mapaVista.vue';
import gestionarMapa from './views/gestionarMapa.vue';



export const PublicRoutes = [
{
    path: '/mapa/:id',
    component: mapaVista,
    name:'mapa'
},
{
    path: '/gestionarMapa',
    component: gestionarMapa,
    name:'gestionarMapa'
}
];
