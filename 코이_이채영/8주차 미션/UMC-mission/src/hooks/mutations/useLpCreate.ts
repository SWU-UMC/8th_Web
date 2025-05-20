import { useMutation, UseMutationOptions, UseMutationResult } from "@tanstack/react-query";
import { createLp } from "../../apis/lp";
import { queryClient } from "../../App";
import { QUERY_KEY } from "../../constants/key";
import { RequestLpDto, ResponseLpDto } from "../../types/lp";

function useCreateLp(options?: UseMutationOptions<ResponseLpDto, Error, RequestLpDto>): UseMutationResult<ResponseLpDto, Error, RequestLpDto> {
    return useMutation<ResponseLpDto, Error, RequestLpDto>({
        mutationFn: createLp,
        onSuccess: (data, variables, context) => {
            queryClient.invalidateQueries({
                queryKey: [QUERY_KEY.lps],
                exact: true,
            });

            options?.onSuccess?.(data, variables, context);
        },
        ...options,
    });
}

export default useCreateLp;