<template>
    <div class="container">
        <h1 class="text-center my-5">Демонстрационная карта <span class="text-info">Vue + Laravel</span></h1>

        <div class="row">
            <div class="col-9">
                <div class="map card" id="map"></div>
            </div>
            <div class="col-3">
                <h5 class="font-weight-bold pb-3">Инструкция</h5>
                <p class="text-info">
                    <span class="text-primary">ДОБАВИТЬ МАРКЕР</span> - нажмите левую кнопку мышки на нужной точке в области карты<br><br>
                    <span class="text-primary">ПЕРЕМЕЩЕНИЕ ПО КАРТЕ</span> - нажмите левую кнопку мышки в области карты и не отпуская перемещайте ее
                </p>
            </div>
        </div>
    </div>
</template>

<script>
    import L from 'leaflet'
    import 'leaflet/dist/leaflet.css'

    import markerService from '../services/marker-service';

    export default {
        data() {
            return {
                map: null,
                tileLayer: null,
                markerList: null,
            }
        },
        mounted() {
            markerService.getAllMarkers()
                .then(resp => {
                    this.setMarkerList(resp.data.data);
                    this.initMap();
                    this.initLayers();
                });
        },
        methods: {
            setMarkerList(data) {
                this.markerList = data;
            },
            initMap() {
                this.map = L.map('map').setView(
                    [45.63, 63.31], 13
                );

                this.tileLayer = L.tileLayer(
                    'https://cartodb-basemaps-{s}.global.ssl.fastly.net/rastertiles/voyager/{z}/{x}/{y}.png'
                ).addTo(this.map);
            },
            initLayers() {
                this.markerList.forEach(this.renderMarker);
            },
            renderMarker(marker) {
                const icon = new L.Icon.Default();
                icon.options.shadowSize = [0,0];

                L.marker(marker.coords, { icon })
                    .addTo(this.map)
                    .bindPopup(
                        'Добавлено: ' + marker.created_at
                        + (marker.comment ? ('<br>Заметка: ' + marker.comment) : '')
                    );
            },
        },
    }
</script>

<style>
    .map { height: 400px }
</style>
