
import { postSignin } from "../apis/auth";
import { LOCAL_STORAGE_KEY } from "../constants/key";
import useForm from "../hooks/useForm";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { UserSigninInformation, validateSignin } from "../utils/validate";
import { Link } from "react-router-dom";

const LoginPage = () => {
  const {setItem}= useLocalStorage(LOCAL_STORAGE_KEY.accessToken)
  const {values, errors, touched, getInputProps}= useForm<UserSigninInformation>({
    initialValue: {
      email: "",
      password: "",
    },
    validate: validateSignin
  })

  const handleSubmit = async ()=>{
    console.log(values);
    try{
      const response =await postSignin(values);
      setItem(response.data.accessToken)
    } catch(error){
      alert((error as Error).message);
    }


  }
  // 오류가 하나라도 있거나, 입력값이 비어있으면 버튼을 비활성화
  const isDisabled=
    Object.values(errors || {}).some((error)=> error.length>0) ||
    Object.values(values).some((value)=> value==="");
    
  
    
    return (
      <div className="flex flex-col items-center text-white justify-center h-full gap-4">
        <div className="flex flex-col gap-3">
        <div className="relative w-full h-12 flex items-center">
          <Link to="/" className="absolute left-4 top-1/2 -translate-y-1/2">
            <span className="text-2xl text-white cursor-pointer hover:text-red-500">&lt;</span>
          </Link> 
          <h1 className="absolute left-1/2 text-white top-1/2 -translate-x-1/2 -translate-y-1/2 text-xl font-semibold">
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
          disabled={isDisabled} 
          className="w-full bg-pink-500 hover:bg-pink-700 text-white py-3 rounded-md text-lg font-medium 
           transition-colors cursor-pointer disabled:bg-gray-300"
        >
          로그인
        </button>
      </div>
    </div>

    )
  }
  
  export default LoginPage;