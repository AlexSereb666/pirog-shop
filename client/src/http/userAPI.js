import { $host } from "./index";
import { jwtDecode } from 'jwt-decode';

export const userRegistration = async (login, password, email, phone, role, address) => {
    try {
        const { data } = await $host.post('api/user/registration', { login, password, email, phone, role, address });
        return jwtDecode(data.token);
    } catch (error) {
        if (error.response) {
            return error.response.status
        } else {
            return 500;
        }
    }
}

export const loginFunc = async (login, password) => {
    const { data } = await $host.post('api/user/login', {login, password})
    localStorage.setItem('token', data.token)
    return jwtDecode(data.token)
}

export const check = async () => {
    try {
        const { data } = await $host.post('api/user/auth')
        localStorage.setItem('token', data.token)
        return jwtDecode(data.token)
    } catch (e) {
        console.log(e)
    }
}

export const changePassword = async (oldPassword, newPassword, userId) => {
    try {
        const { data } = await $host.post('api/user/change-password', { oldPassword, newPassword, userId });
        return data.message;
    } catch (error) {
        if (error.response) {
            return error.response.data.message;
        } else {
            return 'Внутренняя ошибка сервера';
        }
    }
}

export const changeProfile = async (newLogin, newEmail, newPhone, userId) => {
    try {
        const { data } = await $host.post('api/user/change-profile', { newLogin, newEmail, newPhone, userId });
        localStorage.setItem('token', data.token);
        return jwtDecode(data.token)
    } catch (error) {
        if (error.response) {
            return error.response.data.message;
        } else {
            return 'Внутренняя ошибка сервера';
        }
    }
}

export const getUserById = async (userId) => {
    try {
        const { data } = await $host.get(`api/user/getOne/${userId}`);
        return data;
    } catch (error) {
        if (error.response) {
            return error.response.data.message;
        } else {
            return 'Внутренняя ошибка сервера';
        }
    }
}

export const getUsers = async () => {
    const { data } = await $host.get(`api/user/getAll`);
    return data;
}

export const changeRole = async (id, role) => {
    const { data } = await $host.put(`api/user/editStatus/${id}`, {role});
    return data;
}
