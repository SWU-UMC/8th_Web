import { useMutation } from "@tanstack/react-query";
import { updateLp } from "../../apis/lp";
import { queryClient } from "../../App";
import { QUERY_KEY } from "../../constants/key";
import { RequestLpDto, ResponseLpDto } from "../../types/lp";

function useLpUpdate(lpId: number) {
    return useMutation({
        mutationFn: (lpData: RequestLpDto) => updateLp(lpId, lpData),

        onMutate: async (newData) => {
            // 쿼리 취소 및 기존 데이터를 가져옴
            await queryClient.cancelQueries({ queryKey: [QUERY_KEY.lps, lpId] });

            const previousLp = queryClient.getQueryData<ResponseLpDto>([QUERY_KEY.lps, lpId]);

            if (!previousLp) {
                return { previousLp: undefined }; // 이전 LP 정보가 없다면 그냥 반환
            }

            // 이전 데이터와 새로운 데이터로 optimistic update 설정
            const updatedLp = {
                ...previousLp,
                data: {
                    ...previousLp.data,
                    ...newData, // 새로운 데이터를 기존 데이터에 덮어씌움
                },
            };

            // 업데이트된 데이터를 설정
            queryClient.setQueryData([QUERY_KEY.lps, lpId], updatedLp);

            return { previousLp }; // 이전 데이터를 반환해 오류가 발생했을 때 복구할 수 있게 함
        },

        onError: (_error, _newData, context) => {
            // 에러 발생 시 이전 데이터로 복구
            if (context?.previousLp) {
                queryClient.setQueryData([QUERY_KEY.lps, lpId], context.previousLp);
            }
        },

        onSettled: async () => {
            // 수정 후에는 쿼리 무효화
            await queryClient.invalidateQueries({
                queryKey: [QUERY_KEY.lps, lpId],
                exact: true,
            });
        },
    });
}

export default useLpUpdate;
