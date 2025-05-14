import { useMutation, useQueryClient } from "@tanstack/react-query";
import { QUERY_KEY } from "../../constants/key";
import { deleteLp } from "../../apis/lp";

function useDeleteLp() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: deleteLp,
        onSuccess: (_data, variables) => {
        queryClient.invalidateQueries({ queryKey: [QUERY_KEY.lps] });
        queryClient.removeQueries({ queryKey: [QUERY_KEY.lpDetail, variables.lpId] });
        },
    });
}

export default useDeleteLp;