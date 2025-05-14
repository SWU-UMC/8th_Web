import { useMutation } from "@tanstack/react-query";
import { updateMyInfo } from "../../apis/auth";
import { RequestUpdateMyInfoDto } from "../../types/auth";

function useUpdateMyInfo() {
  return useMutation({
    mutationFn: (body: RequestUpdateMyInfoDto) => updateMyInfo(body),
  });
}

export default useUpdateMyInfo;
