import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createLp } from '../../apis/lp';
import { CreateLpRequest, CreateLpResponse } from '../../types/lp';

export const useLpCreate = () => {
  const queryClient = useQueryClient();

  return useMutation<CreateLpResponse, unknown, CreateLpRequest>({
    mutationFn: createLp,
    onSuccess: (data) => {
      console.log('LP 생성 성공:', data.data);
      
      queryClient.invalidateQueries({ queryKey: ['lps'] });
      alert('LP가 성공적으로 생성되었습니다!');
    },
    onError: (error) => {
      console.error('LP 생성 실패:', error);
      alert('LP 생성 중 문제가 발생했습니다.');
    },
  });
};