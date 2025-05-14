// hooks/mutations/useUpdateProfile.ts
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateProfile } from "../../apis/auth";

interface ProfileData {
  name: string;
  bio?: string;
  avatar?: File | null;
}

const useUpdateProfile = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: FormData) => updateProfile(data),
    onSuccess: () => {
      // 프로필 업데이트 성공 시, 사용자 정보 다시 불러오기
      queryClient.invalidateQueries({ queryKey: ["myInfo"] });
    },
  });
};

export default useUpdateProfile;