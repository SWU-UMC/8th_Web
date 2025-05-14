import { ChevronLeft } from "lucide-react";
import useForm from "../hooks/useForm";
import { UserSigninInformation, validateSignin } from "../utils/validate";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useEffect } from "react";

const LoginPage = () => {
    const {login, accessToken} = useAuth();
    const navigate = useNavigate();
    
    useEffect(() => {
        if (accessToken) {
            navigate("/")
        }
    }, [navigate, accessToken])


    const {values, errors, touched, getInputProps} = useForm<UserSigninInformation>({
        initialValue: {
            email: "",
            password: "",
        },
        validate: validateSignin,
    });

    const handleSubmit = async() =>{
        await login(values);  
    };

    const handleGoogleLogin = () => {
        window.location.href = import.meta.env.VITE_SERVER_API_URL + "/v1/auth/google/login"
    }

    // 오류가 하나라도 있거나, 입력값이 비어있으면 버튼 비활성화
    const isDisabled = 
        Object.values(errors || {}).some((error)=>error.length > 0) || // 오류가 있으면 true
        Object.values(values).some((value)=> value === ""); // 입력값이 비어있으면 true
    return (
        <div className="flex flex-col items-center justify-center h-full gap-4">
            <div className="w-[300px] flex items-center justify-between px-2 py-2 relative">
                <button onClick={() => navigate(-1)} className="cursor-pointer"><ChevronLeft size={24} /></button>
                <h1 className="text-xl font-semibold absolute left-1/2 -translate-x-1/2">로그인</h1>
                <div className="w-6" /> 
            </div>
            <div className="flex flex-col gap-3">
                <input 
                    {...getInputProps("email")}
                    name="email"
                    className={`border border-[#ccc] w-[300px] p-[10px] focus:border-[#807bff] rounded-sm 
                        ${errors?.email && touched?.email ? "border-red-500 bg-red-200" : "border-gray-300"}`} 
                    type={"email"} 
                    placeholder={"이메일"}
                />
                {errors?.email && touched?.email && (<div className="text-red-500 text-sm">{errors.email}</div>)}
                <input 
                    {...getInputProps("password")}
                    className={`border border-[#ccc] w-[300px] p-[10px] focus:border-[#807bff] rounded-sm 
                        ${errors?.password && touched?.password ? "border-red-500 bg-red-200" : "border-gray-300"}`} 
                    type={"password"} 
                    placeholder={"비밀번호"}
                />
                {errors?.password && touched?.password && (<div className="text-red-500 text-sm">{errors.password}</div>)}
                <button 
                type="button" 
                onClick={handleSubmit} 
                disabled={isDisabled} 
                className="w-full bg-pink-200 text-gray-500 py-3 rounded-md text-md font-medium hover:bg-pink-300 transition-colors cursor-pointer disabled:bg-gray-300"
                >로그인</button>
                <div className="flex items-center w-[300px] my-2">
                    <div className="flex-grow border-t border-gray-300" />
                    <span className="mx-3 text-gray-400 text-sm">OR</span>
                    <div className="flex-grow border-t border-gray-300" />
                </div>
                <button 
                type="button" 
                onClick={handleGoogleLogin} 
                className="w-full bg-pink-200 text-gray-500 py-3 rounded-md text-md font-medium hover:bg-pink-300 transition-colors cursor-pointer disabled:bg-gray-300"
                ><div className="flex items-center justify-center gap-3">
                    <img src={"/images/google.svg"} alt="Google Logo Image" width="24" height="24"/>
                    <span>구글 로그인</span>
                </div>
                </button>
            </div>
        </div>
    );
}

export default LoginPage;