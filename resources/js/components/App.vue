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

        <modal v-bind:categories="categories"
               v-bind:marker="newMarker"
               @submit="appendMarker">
        </modal>
    </div>
</template>

<script>
    import L from 'leaflet'
    import 'leaflet/dist/leaflet.css'

    import modal from './Modal';

    export default {
        data() {
            return {
                newMarker: {
                    category_id: null,
                    coords: null,
                    comment: null,
                },
                map: null,
                tileLayer: null,
            }
        },
        components: {
            modal
        },
        computed: {
            categories() {
                return this.$store.getters.categories;
            },
            markers() {
                return this.$store.getters.markers;
            }
        },
        mounted() {
            this.$store.dispatch('fetchCategories');
            this.$store.dispatch('fetchMarkers').then(() => {
                this.initMap();
                this.initLayers();
            });
        },
        methods: {
            initMap() {
                this.map = L.map('map').setView(
                    [45.63, 63.31], 13
                );

                this.tileLayer = L.tileLayer(
                    'https://cartodb-basemaps-{s}.global.ssl.fastly.net/rastertiles/voyager/{z}/{x}/{y}.png'
                ).addTo(this.map);

                this.map.on('click', this.openDialog);
            },
            initLayers() {
                this.markers.forEach(this.renderMarker);
            },
            openDialog(e) {
                this.newMarker.category_id = null;
                this.newMarker.comment = null;
                this.newMarker.coords = e.latlng;

                modal.methods.open();
            },
            appendMarker(marker) {
                modal.methods.close();

                this.$store.dispatch('addMarker', this.newMarker = marker)
                    .then(newMarker => {
                        this.renderMarker(newMarker);
                    });
            },
            renderMarker(marker) {
                const icon = new L.Icon.Default();
                icon.options.shadowSize = [0,0];

                L.marker(marker.coords, { icon })
                    .addTo(this.map)
                    .bindPopup(this.markerTemplate(marker));
            },
            markerTemplate(marker) {
                return 'Добавлено: ' + marker.created_at
                    + '<br>Категория: ' + this.$store.getters.getCategoryName(marker.category_id)
                    + (marker.comment ? ('<br>Заметка: ' + marker.comment) : '')
            },
        },
    }
</script>

<style>
    .map { height: 400px }
</style>
