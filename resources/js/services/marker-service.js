const client = axios.create({
    baseURL: '/api/markers',
});

export default {
    getAllMarkers() {
        return client.get();
    },
    addMarker(data) {
        return client.post('add', data);
    },
};
