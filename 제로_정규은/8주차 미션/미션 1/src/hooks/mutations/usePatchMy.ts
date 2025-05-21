import { useMutation } from "@tanstack/react-query";
import { QUERY_KEY } from "../../constants/key";
import { queryClient } from "../../App";
import { patchMyInfo } from "../../apis/auth";
import { ResponseMyInfoDto } from "../../types/auth";

function usePatchMy () {
    return useMutation({
        mutationFn: patchMyInfo,
        onMutate: async (variables) => {
            await queryClient.cancelQueries({
                queryKey: [QUERY_KEY.myInfo],
            });

            const prevMyInfo = queryClient.getQueryData<ResponseMyInfoDto>([
                QUERY_KEY.myInfo
            ]);

            if (prevMyInfo) {
      
                const optimisticMyInfo = {
                    ...prevMyInfo,
                    data: {
                        ...prevMyInfo.data, 
                        ...variables,     
                    }
                }
                queryClient.setQueryData([QUERY_KEY.myInfo], optimisticMyInfo);
            };

            return {prevMyInfo};
        },

        onError: (error, variables, context) => {
            console.log("error", error, variables);
            queryClient.setQueryData(
                [QUERY_KEY.myInfo],
                context?.prevMyInfo
            );
        },

        onSettled: (data, error, variables, context) => {
            queryClient.invalidateQueries({
                queryKey: [QUERY_KEY.myInfo],
                exact: true,
            });
        },
    })

};

export default usePatchMy;