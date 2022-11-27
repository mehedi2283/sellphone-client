import { useEffect } from "react"


const useTitle = title => {
    useEffect(()=>{

        document.title = `${title} - SellPhone`;
        
    },[title])
}
export default (useTitle);