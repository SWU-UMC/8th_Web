import { useMutation } from '@tanstack/react-query';
import { deleteUser } from '../../apis/auth';

export const useDeleteUser = () => {
  return useMutation({
    mutationFn: deleteUser,
    onSuccess: () => {
      alert('회원 탈퇴가 완료되었습니다.');
      location.href = '/'; 
    },
    onError: () => {
      alert('회원 탈퇴에 실패했습니다.');
    },
  });
};