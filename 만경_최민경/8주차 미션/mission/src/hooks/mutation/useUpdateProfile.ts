
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ResponseMyInfoDto } from '../../types/auth';
import { useAuth } from '../../context/AuthContext';
import { updateProfile } from '../../apis/auth';

// useUpdateProfile 훅
const useUpdateProfile = () => {
  const queryClient = useQueryClient();
  const { setUserName } = useAuth();

  return useMutation<
    ResponseMyInfoDto, 
    Error, 
    FormData,
    { previousData: ResponseMyInfoDto | undefined }
  >({
    mutationFn: updateProfile,
    onMutate: async (newProfile: FormData) => {
      // 기존 쿼리 취소
      await queryClient.cancelQueries({ queryKey: ['myInfo'] });

      // 현재 데이터 백업
      const previousData = queryClient.getQueryData<ResponseMyInfoDto>(['myInfo']);

      // FormData에서 name 추출
      const newName = newProfile.get('name') as string;
      
      // Optimistic Update - UI에 즉시 반영
      if (previousData && previousData.data && newName) {
        // React Query 캐시 업데이트
        queryClient.setQueryData<ResponseMyInfoDto>(['myInfo'], {
          ...previousData,
          data: {
            ...previousData.data,
            name: newName,
            bio: newProfile.get('bio') as string || previousData.data.bio,
          }
        });

        // Navbar의 userName도 즉시 업데이트
        setUserName(newName);
      }

      // 롤백을 위한 이전 데이터 반환
      return { previousData };
    },
    onError: (error, newProfile, context) => {
      // 에러 발생 시 이전 데이터로 롤백
      if (context?.previousData) {
        queryClient.setQueryData(['myInfo'], context.previousData);
        // userName도 롤백
        if (context.previousData.data?.name) {
          setUserName(context.previousData.data.name);
        }
      }
      console.error('프로필 업데이트 에러:', error);
    },
    onSuccess: (data) => {
      console.log('프로필 업데이트 성공:', data);
      
      // 성공 시에도 실제 서버 데이터로 업데이트
      queryClient.setQueryData(['myInfo'], data);
      if (data.data?.name) {
        setUserName(data.data.name);
      }
    },
    onSettled: () => {
      // 성공/실패 관계없이 캐시 무효화하여 최신 데이터 가져오기
      queryClient.invalidateQueries({ queryKey: ['myInfo'] });
    },
  });
};

export default useUpdateProfile;