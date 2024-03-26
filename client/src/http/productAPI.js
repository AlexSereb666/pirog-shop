import { $host } from "./index";

export const createType = async (type) => {
    const {data} = await $host.post('api/type', type)
    return data
}

export const fetchTypes = async () => {
    const {data} = await $host.get('api/type')
    return data
}

export const createProduct = async (product) => {
    const {data} = await $host.post('api/product', product)
    return data
}

export const getAll = async () => {
    const {data} = await $host.get('api/product/standart')
    return data
}

export const fetchProducts = async (ProductTypeId, page, limit = 8) => {
    const {data} = await $host.get('api/product', {params: {
        ProductTypeId, page, limit
    }})
    return data
}

export const fetchOneProduct = async (id) => {
    const {data} = await $host.get('api/product/getOne/' + id)
    return data
}

export const deleteProduct = async (id) => {
    const {data} = await $host.delete('api/product/delete/' + id)
    return data
}
