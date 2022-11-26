import { useEffect } from "react"


const useTitle = title => {
    useEffect(()=>{

        document.title = `${title} - tourDE`;
        
    },[title])
}
export default (useTitle);