import { useMutation, useQueryClient } from "@tanstack/react-query";
import { RequestUpdateLpDto, ResponseLpDto } from "../../types/lp";
import { updateLp } from "../../apis/lp";
import { QUERY_KEY } from "../../constants/key";

function useUpdateLp() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: updateLp,
        onSuccess: (updatedData: ResponseLpDto, variables: RequestUpdateLpDto) => {
            queryClient.invalidateQueries({ queryKey: [QUERY_KEY.lps] });
            queryClient.invalidateQueries({ queryKey: [QUERY_KEY.lpDetail, variables.lpId] });
    },
});
}

export default useUpdateLp;