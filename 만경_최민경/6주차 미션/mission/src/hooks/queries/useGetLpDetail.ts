import { useQuery } from "@tanstack/react-query";
import { QUERY_KEY } from "../../constants/key";
import { getLpDetail } from "../../apis/lp";
import useGetLpList from "./useGetLpList";

function useGetLpDetail(lpId){
    return useQuery({
        queryKey:[QUERY_KEY.lps,lpId],
        queryFn:()=>
            getLpDetail({lpId}),
       
   
    } 
  );
}

export default useGetLpDetail;