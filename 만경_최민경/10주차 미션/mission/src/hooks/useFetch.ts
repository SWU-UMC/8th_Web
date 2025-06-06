import { AxiosRequestConfig } from "axios";
import { useEffect, useState } from "react";
import { axiosClient } from "../apis/axiosClient";

const useFetch=<T>(url:string, options?: AxiosRequestConfig)=> {
    const [data,setData]= useState<T | null>(null);
    const [error, setError]= useState<string | null>(null);
    const [isLoading, setIsLoading]= useState<boolean>(false);
    
    useEffect((): void => {
        const fetchData=async (): Promise<void> => {
            setIsLoading(true);
            try{
                const response=await axiosClient.get(url,{
                    ...options,
                });

                setData(response.data);
            } catch{
                setError("데이터를 가져오는데 문제가 발생했습니다.")
            } finally{
                setIsLoading(false)
            }
        }
        fetchData();
    }, [url, options]);

    return {
        data,
        error,
        isLoading,
    }


};

export default useFetch;