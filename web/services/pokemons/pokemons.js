import http from "../base-api/base-api";

const list = (query) =>
    http.get("/pokemons", { params: query })

const detail = (id) => http.get(`/pokemons/${id}`)

export default {
    list,
    detail,
}