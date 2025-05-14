import { useMutation } from "@tanstack/react-query";
import { patchLp } from "../../apis/lp";
import { CreateLpDto } from "../../types/lp";

function usePatchLp(lpId: number) {
  return useMutation({
    mutationFn: (dto: CreateLpDto) => patchLp(lpId, dto),
  });
}

export default usePatchLp;
