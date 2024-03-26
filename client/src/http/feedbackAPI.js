import { $host } from "./index";

export const feedbackCreate = async (userId, title, message) => {
    const { data } = await $host.post('api/feedback', {userId, title, message})
    return data
}

export const getAll = async () => {
    const { data } = await $host.get('api/feedback')
    return data
}

export const updateStatus = async (id, status) => {
    const { data } = await $host.put(`api/feedback/${id}`, {status})
    return data
}

export const deleteById = async (id) => {
    const { data } = await $host.delete(`api/feedback/${id}`)
    return data
}
