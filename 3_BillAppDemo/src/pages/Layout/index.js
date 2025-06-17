import { Button } from "antd-mobile"
import { Outlet } from "react-router-dom"
import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { getBillList } from "@/store/modules/billStore"

const Layout=()=>{
    const dispatch = useDispatch()
    useEffect(()=>{
        dispatch(getBillList())
    },[dispatch])
    return (
        <div>
            <Outlet/>
            this is layout
            <Button color="primary">123</Button>
        </div>
    )
}

export default Layout