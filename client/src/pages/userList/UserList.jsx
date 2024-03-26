import React, {useState, useEffect} from "react";
import './UserList.css'
import { getUsers, changeRole } from '../../http/userAPI'
import InputAuth from '../../components/input-auth/InputAuth';
import CustomDropdown from '../../components/customDropdown2/CustomDropdown';

const UserList = () => {
    const [search, setSearch] = useState("");
    
    const [listUser, setListUser] = useState([])
    const [sortListUser, setSortListUser] = useState([])

    const listStatus = [
        {id: 1, name: 'ADMIN'},
        {id: 2, name: 'USER'}
    ]

    const initList = () => {
        getUsers().then((item) => setListUser(item))
    }

    useEffect(() => {
        initList()
    }, [])

    useEffect(() => {
        setSortListUser(listUser)
    }, [listUser])

    useEffect(() => {
        const filteredProducts = listUser.filter(item =>
            item.login.toLowerCase().includes(search.toLowerCase())
        );
        setSortListUser(filteredProducts);
    }, [search]);

    const handleSelectStatus = (value, id) => {
        changeRole(id, value).then((item) => console.log(item))
    };

    return (
        <div className="user-list">
            <div className="shadow-container">
                <div className="user-list-menu-top">
                    <div className="user-list-menu-top-search">
                        <InputAuth 
                            value={search} 
                            setValue={setSearch} 
                            type="text" 
                            required={true} 
                            label={'Поиск'}
                            maxLength={55}
                        />
                    </div>
                </div>
                <div className="user-list-list">
                    {sortListUser.length > 0 ? (
                        sortListUser.map((item) => (
                            <div className="user-list-list-item">
                                <div className="user-list-list-item-login">
                                    {item.login}
                                </div>
                                <div className="user-list-list-item-email">
                                    {item.email}
                                </div>
                                <div className="user-list-list-item-phone">
                                    {item.phone}
                                </div>
                                <div className="user-list-list-item-role">
                                    <CustomDropdown
                                        options={listStatus}
                                        onSelect={(value) => handleSelectStatus(value, item.id)}
                                        text="Статус..."
                                        containerStyle={{ width: '160px' }}
                                        selectedItem={item.role}
                                    />
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="edit-product-menu-list-not-found">
                            Продукты не найдены
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default UserList;
