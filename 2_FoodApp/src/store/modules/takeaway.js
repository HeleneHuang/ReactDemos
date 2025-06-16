import { createSlice } from "@reduxjs/toolkit"
import axios from "axios"

const foodStore = createSlice({
    name:'foods',
    initialState: {
        foodsList:[]
    },
    reducers: {
        setFoodList(state, action){
            state.foodsList = action.payload
        }
    }
})

const {setFoodList} = foodStore.actions
const fetchFoodsList =()=>{
    return async(dispatch) =>{
        const res = await axios.get('http://localhost:3004/takeaway')
        dispatch(setFoodList(res.data))
    }
}

export {fetchFoodsList}
const foodReducer = foodStore.reducer
export default foodReducer