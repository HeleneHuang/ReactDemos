import { createSlice } from "@reduxjs/toolkit"
import axios from "axios"

const foodStore = createSlice({
    name:'foods',
    initialState: {
        foodsList:[],
        activeIndex: 0
    },
    reducers: {
        setFoodList(state, action){
            state.foodsList = action.payload
        },
        changeActiveIndex(state, action){
            state.activeIndex = action.payload
        }
    }
})

const fetchFoodsList =()=>{
    return async(dispatch) =>{
        const res = await axios.get('http://localhost:3004/takeaway')
        dispatch(setFoodList(res.data))
    }
}

const {setFoodList, changeActiveIndex} = foodStore.actions
export {fetchFoodsList, changeActiveIndex}
const foodReducer = foodStore.reducer
export default foodReducer