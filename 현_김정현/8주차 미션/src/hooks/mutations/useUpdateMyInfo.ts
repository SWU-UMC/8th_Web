import { useMutation, useQueryClient } from "@tanstack/react-query";
import { QUERY_KEY } from "../../constants/key";
import { ResponseMyInfoDto } from "../../types/auth";
import { updateMyInfo } from "../../apis/user";

// interface UpdateMyInfoPayload {
//     name: string;
//     bio: string;
//     avatar: string | null;
// }

const useUpdateMyInfo = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: updateMyInfo,

        // optimistic update
        onMutate: async (newData) => {
            await queryClient.cancelQueries({ queryKey: [QUERY_KEY.myInfo] });
            const previousData = queryClient.getQueryData<ResponseMyInfoDto>([QUERY_KEY.myInfo]);

            if (previousData) {
                const newMyInfo = {
                    ...previousData,
                    data: {
                        ...previousData.data,
                        ...newData,
                    },
                };
                queryClient.setQueryData([QUERY_KEY.myInfo], newMyInfo);
            }

            return { previousData };
        },

        onError: (_err, _newData, context) => {
            if (context?.previousData) {
                queryClient.setQueryData([QUERY_KEY.myInfo], context.previousData);
            }
        },

        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: [QUERY_KEY.myInfo] });
        },
    });
};

export default useUpdateMyInfo;