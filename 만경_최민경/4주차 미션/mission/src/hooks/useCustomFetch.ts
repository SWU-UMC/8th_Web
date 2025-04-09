import axios from "axios";
import { useEffect, useState } from "react";

interface ApiResponse<T>{
    data: T|null;
    isPending: boolean;
    isError: boolean;
}

type Language="ko-KR"|"en_US";

function useCustomFetch<T>(url:string,language:Language='en_US'):ApiResponse<T>{
    const [data, setData]=useState<T|null>(null);
    const [isPending, setIsPending]=useState(false);
    const [isError, setISError]=useState(false);

    useEffect(()=>{
        const fetchData=async()=> {
            setIsPending(true);
            
            try{
                const response=await axios.get<T>(url,{
                    headers: {
                        Authorization: `Bearer ${import.meta.env.VITE_TMDB_KEY}`,
                    },
                    params:{
                        language
                    }
                })
                setData(response.data);
            } catch{
                setISError(true);
            } finally{
                setIsPending(false);
            }
        }
        fetchData();
    },[url,language])

    return{data,isPending, isError};
}

export default useCustomFetch;