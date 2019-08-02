<template>
    <div class="modal fade" id="markerModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <form @submit.prevent="submit">
                    <div class="modal-body">
                        <h5>Новый маркер</h5>
                        <hr>
                        <div class="form-group">
                            <label>Категория</label>
                            <select class="form-control" v-model="marker.category_id" required>
                                <option :value="null" disabled>(выберите категорию)</option>
                                <option v-for="category in categories" :value="category.id">{{category.name}}</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label for="coord_comment">Заметка</label>
                            <textarea class="form-control" id="coord_comment" v-model="marker.comment"></textarea>
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
</template>

<script>
    export default {
        props: {
            categories: Array,
            marker: Object
        },
        methods: {
            open() {
                $('#markerModal').modal('show');
            },
            close() {
                $('#markerModal').modal('hide');
            },
            submit() {
                this.$emit('submit', this.marker);
            },
        }
    }
</script>
