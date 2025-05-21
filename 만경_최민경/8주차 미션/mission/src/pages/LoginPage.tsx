import { useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import useForm from "../hooks/useForm";

import { UserSigninInformation, validateSignin } from "../utils/validate";
import { Link, useNavigate } from "react-router-dom";
import useLogin from "../hooks/mutation/useLogin";


const LoginPage = () => {
  const {login,accessToken}=useAuth();
  
  const navigate=useNavigate();

   useEffect(()=> {
    if(accessToken){
      navigate("/")
    }
   },[navigate,accessToken]);
   
  
  const {values, errors, touched, getInputProps}= useForm<UserSigninInformation>({
    initialValue: {
      email: "",
      password: "",
    },
    validate: validateSignin
  })


  const handleGoogleLogin=()=>{
    window.location.href=import.meta.env.VITE_SERVER_API_URL+ "/v1/auth/google/login";
  }

  const loginMutation=useLogin();

   const handleSubmit = ()=>{
    
    loginMutation.mutate(values,{
      onSuccess:()=>{
        navigate("/");
      },
      onError:()=>{
        console.error(errors)
        alert("로그인 실패. 아이디와 비밀번호를 다시 입력하세요.")
      }
    })
  }

  

  // 오류가 하나라도 있거나, 입력값이 비어있으면 버튼을 비활성화
  const isDisabled=
    Object.values(errors || {}).some((error)=> error.length>0) ||
    Object.values(values).some((value)=> value==="");
    
  
    
    return (
      <div className="flex flex-col items-center text-black justify-center h-full gap-4">
        <div className="flex flex-col gap-3">
        <div className="relative w-full h-12 flex items-center">
          <Link to="/" className="absolute left-4 top-1/2 -translate-y-1/2">
            <span className="text-2xl text-black cursor-pointer hover:text-red-500">&lt;</span>
          </Link> 
          <h1 className="absolute left-1/2 text-black top-1/2 -translate-x-1/2 -translate-y-1/2 text-xl font-semibold">
            로그인
          </h1>
        </div>

        <div className="space-y-4">
          <button className="w-full border border-gray-600 rounded py-2 px-4 flex justify-center items-center gap-2">           
            <span>구글 로그인</span>
          </button>

          <div className="flex items-center justify-center gap-4">
            <div className="border-t border-gray-600 flex-grow"></div>
            <span className="text-gray-400 text-sm">OR</span>
            <div className="border-t border-gray-600 flex-grow"></div>
          </div>
        </div>

        <input 
          {...getInputProps('email')}
          name="email"
          className={`border border-[#ccc] w-[300px] p-[10px] focus:border-[#807bff] rounded-sm
            ${errors?.email && touched?.email ? "border-red-500 bg-red-200" : "border-gray-300"}`}
          type="email"
          placeholder="이메일"
        />
        {errors?.email && touched?.email && (
          <div className="text-red-500">{errors.email}</div>
        )}

        <input
          {...getInputProps('password')} 
          className={`border border-[#ccc] w-[300px] p-[10px] focus:border-[#807bff] rounded-sm
            ${errors?.password && touched?.password ? "border-red-500 bg-red-200" : "border-gray-300"}`}
          type="password"
          placeholder="비밀번호"
        />
        {errors?.password && touched?.password && (
          <div className="text-red-500">{errors.password}</div>
        )}

        <button 
          type="button" 
          onClick={handleSubmit} 
          disabled={isDisabled || loginMutation.isPending} 
          className="w-full bg-pink-500 hover:bg-pink-700 text-black py-3 rounded-md text-lg font-medium 
           transition-colors cursor-pointer disabled:bg-gray-300"
        >
          {loginMutation.isPending ? '로그인 중...' : '로그인'}
        </button>
        <button 
          type="button" 
          onClick={handleGoogleLogin} 
          // disabled={isDisabled} 
          className="w-full bg-pink-500 hover:bg-pink-700 text-black py-3 rounded-md text-lg font-medium 
           transition-colors cursor-pointer disabled:bg-gray-300"
        >
          <div className="flex items-center justify-center gap-4">
            <img src={"/public/googlelogo.png"} alt="google logo image" className="w-5 h-5"/>
            <span>구글 로그인</span>
          </div>
        </button>
      </div>
    </div>

    )
  }
  
  export default LoginPage;