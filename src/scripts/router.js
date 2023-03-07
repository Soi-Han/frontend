import {createRouter, createWebHistory} from 'vue-router'
import Home from "@/pages/Home"
import Cart from "@/pages/Cart"
import Login from "@/pages/Login"
import Signup from "@/pages/Signup"
import Order from "@/pages/Order"
import Orders from "@/pages/Orders"
import SearchPage from "@/pages/SearchPage"
import WineView from "@/pages/WineView"

const routes=[
    {path:'/', component: Home},//루트경로일때홈컴포넌트
    {path:'/login', component : Login},
    {path:'/Signup', component : Signup},
    {path:'/cart', component : Cart},
    {path:'/order', component : Order},
    {path:'/orders', component : Orders},
    {path:'/searchpage', component : SearchPage},
    {path:'/WineView/:number', component : WineView, name:'wineview', props:true},
    
    {}

]

const router = createRouter({
    history:createWebHistory(),
    routes 
})
export default router;