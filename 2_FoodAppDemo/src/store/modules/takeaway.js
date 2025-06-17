import { createSlice } from "@reduxjs/toolkit"
import axios from "axios"

const foodStore = createSlice({
    name:'foods',
    initialState: {
        foodsList:[],
        activeIndex: 0,
        cartList: []
    },
    reducers: {
        setFoodList(state, action){
            state.foodsList = action.payload
        },
        changeActiveIndex(state, action){
            state.activeIndex = action.payload
        },
        addCart(state,action){
            const item = state.cartList.find(item=>item.id === action.payload.id)
            if(item){
                item.count++
            } else {
                state.cartList.push(action.payload)
            }
        },
        increCount(state,action){
            const item = state.cartList.find(item=>item.id === action.payload.id)
            item.count++
        },
        decreCount(state,action){
            const item = state.cartList.find(item=>item.id === action.payload.id)
            if(item.count<1){
                state.cartList.pop(action.payload)
            }
            item.count--
        },
        clearCart(state){
            state.cartList=[]
        }
    }
})

const fetchFoodsList =()=>{
    return async(dispatch) =>{
        const res = await axios.get('http://localhost:3004/takeaway')
        dispatch(setFoodList(res.data))
    }
}

const {setFoodList, changeActiveIndex, addCart, increCount, decreCount, clearCart} = foodStore.actions
export {fetchFoodsList, changeActiveIndex, addCart, increCount, decreCount, clearCart}
const foodReducer = foodStore.reducer
export default foodReducer