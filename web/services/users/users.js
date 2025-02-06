import http from "../base-api/base-api";

const create = (user) => http.post("/users", user);

const get = (id) => http.get(`/users/${id}`);

const login = (user) => http.post("/login", user);

const edit = (id, user) => http.patch(`/users/${id}`, user);

export default {
    create,
    get,
    login,
    edit,
};