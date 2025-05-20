import { QUERY_KEY } from './../../constants/key';
import { useMutation } from "@tanstack/react-query"
import { deleteLike } from "../../apis/lp";
import { queryClient } from "../../App";
import { ResponseLpDto } from '../../types/lp';
import { ResponseMyInfoDto } from '../../types/auth';

const useDeleteLike = () => {
  return useMutation({
    mutationFn:deleteLike,
    //onMutate -> API 요청 이전에 호출되는 친구.
    //UI에 바로 변경을 보여주기 Cache 업데이트 진행

    onMutate:async(lp)=> {
      //1. 이 게시글에 관련된 쿼리를 취소
      await queryClient.cancelQueries({
        queryKey:[QUERY_KEY.lps,lp.lpId]
      })

      //2. 게시글의 캐시를 가지고 옴
      const previousLpPost=queryClient.getQueryData<ResponseLpDto>
      ([
        QUERY_KEY.lps,lp.lpId
      ])
      // 게시글 데이터를 복사해서 NewLpPost라는 새로운 객체를 만듦
      const newLpPost={...previousLpPost}

      // 게시글에 저장된 좋아요 목록에서 현재 내가 눌렀던 좋아요의 위치를 찾아야 함
      const me=queryClient.getQueryData<ResponseMyInfoDto>
      ([QUERY_KEY.myInfo]);
      const userId=Number(me?.data.id)
      
      const likedindex= 
      previousLpPost?.data.likes.findIndex((like)=> like.userId===userId,
    ) ??-1;

    if(likedindex >= 0){
      previousLpPost?.data.likes.splice(likedindex,1);
    } else{
      const newLike={userId,lpId:lp.lpId}
      previousLpPost?.data.likes.push(newLike);
    }
    //업데이트된 게시글 데이터를 캐시에 저장
    // 이렇게 하면 UI가 바로 변화됨, 사용자가 변화를 확인할 수 있다.
    queryClient.setQueryData([QUERY_KEY.lps,lp.lpId],newLpPost);
    
    return {previousLpPost,newLpPost}
    },
    onError: (err,newLp,context)=>{
      console.log(err,newLp);
      queryClient.setQueryData(
        [QUERY_KEY.lps,newLp.lpId],
        context?.previousLpPost?.data.id,
      )
    },

    //onSettled는 API 요청이 끝난 후 (성공하든 실패하든 실행)
    onSettled: async(data,error,variables,context)=>{
      await queryClient.invalidateQueries({
        queryKey:[QUERY_KEY.lps,variables.lpId]
      })
    }
  })
}

export default useDeleteLike;