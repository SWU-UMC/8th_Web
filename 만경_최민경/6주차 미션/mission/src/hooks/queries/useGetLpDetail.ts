import { useQuery } from "@tanstack/react-query";
import { QUERY_KEY } from "../../constants/key";
import { getLpList } from "../../apis/lp";
import { PaginationDto } from "../../types/common";

function useGetLpDetail({cursor,search, order,limit}: PaginationDto){
    return useQuery({
        queryKey:[QUERY_KEY.lps,search,order],
              queryFn:()=>
                  getLpList({
                  cursor,
                  search,
                  order,
                  limit,
              }),
           
              staleTime:1000*60*5, //5분
        
              gcTime:1000*60*10,//10분

              select: data=> data.data.data,
       
   
    } 
  );
}

export default useGetLpDetail;