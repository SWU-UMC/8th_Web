import { useMutation } from "@tanstack/react-query";
import { patchUpdateUser } from "../../apis/auth";
import { queryClient } from "../../App"; 
import { QUERY_KEY } from "../../constants/key"; 
import { ResponseMyInfoDto } from "../../types/auth";

function useUserUpdate() {
    return useMutation({
        mutationFn: patchUpdateUser,

        onMutate: async (newData) => {
            await queryClient.cancelQueries({ queryKey: [QUERY_KEY.myInfo] });

            const previousMyInfo = queryClient.getQueryData<ResponseMyInfoDto>([QUERY_KEY.myInfo]);

            if (previousMyInfo) {
                const newMyInfo = {
                    ...previousMyInfo,
                    data: {
                        ...previousMyInfo.data,
                        ...newData,
                    },
                };
                queryClient.setQueryData([QUERY_KEY.myInfo], newMyInfo);
            }

            return { previousMyInfo };
        },

        onError: (_error, _newData, context) => {
            if (context?.previousMyInfo) {
                queryClient.setQueryData([QUERY_KEY.myInfo], context.previousMyInfo);
            }
        },

        onSettled: async () => {
            await queryClient.invalidateQueries({queryKey: [QUERY_KEY.myInfo]});
        },
        
    });
}

export default useUserUpdate;
