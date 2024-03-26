import { $host } from "./index";

export const addToBasket = async (userId, productId) => {
    const {data} = await $host.post('api/basket', { userId, productId });
    return data;
}

export const getBasket = async (userId) => {
    const {data} = await $host.get(`api/basket/` + userId );
    return data;
}

export const removeFromBasket = async (userId, basketProductId) => {
    const { data } = await $host.delete(`api/basket/${basketProductId}`, { data: { userId } });
    return data;
}
