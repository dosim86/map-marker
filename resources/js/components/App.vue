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

        <div class="modal fade" id="markerModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <form @submit.prevent="appendMarker">
                        <div class="modal-body">
                            <h5>Новый маркер</h5>
                            <hr>
                            <div class="form-group">
                                <label>Категория</label>
                                <select class="form-control" v-model="newMarker.category_id" required>
                                    <option :value="null" disabled>(выберите категорию)</option>
                                    <option v-for="category in categoryList" :value="category.id">{{category.name}}</option>
                                </select>
                            </div>
                            <div class="form-group">
                                <label for="coord_comment">Заметка</label>
                                <textarea class="form-control" id="coord_comment" v-model="newMarker.comment"></textarea>
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button class="btn btn-default" data-dismiss="modal">Отмена</button>
                            <button type="submit" class="btn btn-success">Добавить</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import L from 'leaflet'
    import 'leaflet/dist/leaflet.css'

    import markerService from '../services/marker-service';
    import categoryService from '../services/category-service';

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
                markerList: null,
                categoryList: null,
            }
        },
        mounted() {
            categoryService.getAllCategories()
                .then(resp => {
                    this.setCategoryList(resp.data.data);
                });

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
            setCategoryList(data) {
                this.categoryList = data;
            },
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
                this.markerList.forEach(this.renderMarker);
            },
            openDialog(e) {
                this.newMarker.category_id = null;
                this.newMarker.comment = null;
                this.newMarker.coords = e.latlng;

                $('#markerModal').modal('show');
            },
            appendMarker() {
                $('#markerModal').modal('hide');

                markerService
                    .addMarker(this.newMarker)
                    .then(resp => {
                        this.renderMarker(resp.data.data);
                    });
            },
            renderMarker(marker) {
                const icon = new L.Icon.Default();
                icon.options.shadowSize = [0,0];

                L.marker(marker.coords, { icon })
                    .addTo(this.map)
                    .bindPopup(
                        'Добавлено: ' + marker.created_at
                        + '<br>Категория: ' + this.getCategoryName(marker.category_id)
                        + (marker.comment ? ('<br>Заметка: ' + marker.comment) : '')
                    );
            },
            getCategoryName(id) {
                const matches = this.categoryList.filter(item => {
                    return +item.id === +id;
                });

                return matches.length ? matches[0].name : 'неизвестно'
            },
        },
    }
</script>

<style>
    .map { height: 400px }
</style>
