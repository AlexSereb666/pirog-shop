import { LOGIN_ROUTE, REGISTRATION_ROUTE, MENU_ADMIN, EDIT_PRODUCT,
    PRODUCT_CARD, FEEDBACK_LIST, USER_LIST, FEEDBACK, MENU, BASKET, ORDERS_LIST } from "./pathRouter"
import Registration from "./pages/registration/Registration"
import Login from "./pages/login/Login"
import MenuAdmin from "./pages/menuAdmin/MenuAdmin"
import EditProduct from "./pages/editProduct/EditProduct"
import ProductCard from './pages/productCard/ProductCard'
import FeedbackList from "./pages/feedbackList/FeedbackList"
import UserList from "./pages/userList/UserList"
import Feedback from "./pages/feedback/Feedback"
import MenuProducts from "./pages/menuProducts/MenuProducts"
import Basket from './pages/basket/Basket'
import OrdersList from "./pages/ordersList/OrdersList"

// Страницы, на которые может перейти авторизованный пользователь //
export const authRoutes = [
    {
        path: MENU_ADMIN,
        Component: MenuAdmin
    },
    {
        path: EDIT_PRODUCT,
        Component: EditProduct
    },
    {
        path: PRODUCT_CARD,
        Component: ProductCard
    },
    {
        path: FEEDBACK_LIST,
        Component: FeedbackList
    },
    {
        path: USER_LIST,
        Component: UserList
    },
    {
        path: FEEDBACK,
        Component: Feedback
    },
    {
        path: MENU,
        Component: MenuProducts
    },
    {
        path: BASKET,
        Component: Basket
    },
    {
        path: ORDERS_LIST,
        Component: OrdersList
    }
]

// Страницы, на которые может перейти каждый пользователь //
export const publicRoutes = [
    {
        path: REGISTRATION_ROUTE,
        Component: Registration
    },
    {
        path: LOGIN_ROUTE,
        Component: Login
    },
]
