import { $host } from "./index";

export const addToOrder = async (userId, productId, status) => {
    const {data} = await $host.post('api/order/addOrder', { userId, productId, status, date: new Date() });
    return data;
}

export const updateOrderStatus = async (id, status) => {
    const {data} = await $host.put('api/order/' + id, { status });
    return data;
}

export const getAllOrders = async () => {
    const {data} = await $host.get('api/order');
    return data;
}

export const getOrdersByUserId = async (userId) => {
    const {data} = await $host.get(`api/order/getAllById/${userId}`)
    return data;
}
