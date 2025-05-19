import { useQuery } from "@tanstack/react-query";
import { QUERY_KEY } from "../../constants/key";
import { getMyInfo } from "../../apis/auth";

function useGetMyInfo(accessToken: string | null) {
  return useQuery({
    queryKey: [QUERY_KEY.myInfo],
    queryFn: getMyInfo,
    //accessToken이 있는 경우에만 실행
    enabled: !!accessToken,
  });
}

export default useGetMyInfo;
