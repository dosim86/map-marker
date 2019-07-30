const client = axios.create({
    baseURL: '/api/categories',
});

export default {
    getAllCategories() {
        return client.get();
    },
};
