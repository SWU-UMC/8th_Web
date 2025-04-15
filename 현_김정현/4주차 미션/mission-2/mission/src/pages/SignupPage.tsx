import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { postSignup } from "../apis/auth";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { ChevronLeft, Eye, EyeClosed, Mail, UserRound} from "lucide-react";

const schema = z.object({
    email: z.string().email({message: "올바른 이메일 형식이 아닙니다."}),
    password: z.string().min(8, {message: "비밀번호는 8자 이상이어야 합니다."}).max(20, {message: "비밀번호는 20자 이하여야 합니다."}),
    passwordCheck: z.string().min(8, {message: "비밀번호는 8자 이상이어야 합니다."}).max(20, {message: "비밀번호는 20자 이하여야 합니다."}),
    name: z.string().min(1, {message: "이름을 입력해주세요."})
})
.refine((data)=> data.password === data.passwordCheck, {
    message: "비밀번호가 일치하지 않습니다.",
    path:["passwordCheck"]
})

type FormFields = z.infer<typeof schema>;

const SignupPage = () => {
    const navigate = useNavigate();
    const [step, setStep] = useState(1);
    const {register, handleSubmit, formState:{errors, isSubmitting}, watch} = useForm<FormFields>({
        defaultValues: {
            name: "",
            email: "",
            password: "",
            passwordCheck: "",
        },
        resolver: zodResolver(schema),
        mode: "onChange"
    })

    const email = watch("email");
    const password = watch("password");
    const passwordCheck = watch("passwordCheck");
    const name = watch("name");

    const [showPw, setShowPw] = useState(false);
    const [showPwCheck, setShowPwCheck] = useState(false);


    const onSubmit:SubmitHandler<FormFields> = async(data) => {
        const {passwordCheck, ...rest} = data;

        const response = await postSignup(rest);

        console.log(response);
        navigate("/login"); // 회원가입 성공하면 로그인 페이지로 이동
    };

    return (
        <div className="flex flex-col items-center justify-center h-full gap-4">
            {/*상단 고정 부분*/}
            <div className="w-[300px] flex items-center justify-between px-2 py-2 relative">
                <button onClick={() => navigate(-1)} className="cursor-pointer"><ChevronLeft size={24} /></button>
                <h1 className="text-xl font-semibold absolute left-1/2 -translate-x-1/2">회원가입</h1>
                <div className="w-6" /> 
            </div>
            <div className="flex flex-col gap-3">
                {step === 1 && (
                    <>
                        <input 
                            {...register("email")}
                            className={`border border-[#ccc] w-[300px] p-[10px] focus:border-[#807bff] rounded-md 
                                ${errors?.email ? "border-red-500 bg-red-200" : "border-gray-300"}`} 
                            type={"email"} 
                            placeholder={"이메일"}
                        />
                        {errors.email && (<div className="text-red-500 test-sm">{errors.email.message}</div>)}
                        <button
                            type="button"
                            className="w-full bg-pink-200 text-gray-500 py-3 rounded-md hover:bg-pink-300 transition-colors disabled:bg-gray-300 cursor-pointer"
                            disabled={!email || !!errors.email}
                            onClick={() => setStep(2)}
                        >
                        다음
                        </button>
                    </>
                )}
                {step === 2 && (
                    <>
                        <div className="flex items-center gap-2 text-sm mb-1">
                            <Mail size={16} className="text-black"/>
                            <span className="font-semibold text-black">{email}</span>
                        </div>
                        <div className="relative w-[300px]">
                            <input 
                                {...register("password")}
                                className={`border border-[#ccc] w-[300px] p-[10px] focus:border-[#807bff] rounded-sm 
                                    ${errors?.password ? "border-red-500 bg-red-200" : "border-gray-300"}`} 
                                type={showPw ? "text" : "password"} 
                                placeholder={"비밀번호"}
                            />
                            <button
                                type="button"
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                                onClick={() => setShowPw(!showPw)}
                            >
                                {showPw ? <Eye size={20} /> : <EyeClosed size={20} />}
                            </button>
                        </div>
                        {errors.password && (<div className="text-red-500 test-sm">{errors.password.message}</div>)}
                        
                        <div className="relative w-[300px]">
                            <input 
                                {...register("passwordCheck")}
                                className={`border border-[#ccc] w-[300px] p-[10px] focus:border-[#807bff] rounded-sm 
                                    ${errors?.passwordCheck ? "border-red-500 bg-red-200" : "border-gray-300"}`} 
                                type={showPwCheck ? "text" : "password"} 
                                placeholder={"비밀번호 확인"}
                            />
                            <button
                                type="button"
                                onClick={() => setShowPwCheck((prev) => !prev)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                            >
                                {showPwCheck ? <Eye size={20} /> : <EyeClosed size={20} />}
                            </button>
                        </div>
                        {errors.passwordCheck && (<div className="text-red-500 test-sm">{errors.passwordCheck.message}</div>)}
                        <button
                            type="button"
                            className="w-full bg-pink-200 text-gray-500 py-3 rounded-md hover:bg-pink-300 transition-colors disabled:bg-gray-300 cursor-pointer"
                            disabled={
                                !password ||
                                !passwordCheck ||
                                !!errors.password ||
                                !!errors.passwordCheck
                            }
                            onClick={() => setStep(3)}
                            >
                            다음
                        </button>
                    </>
                )}
                {step === 3 && (
                    <>
                        <div className="flex flex-col items-center gap-2 mb-2">
                            <div
                                className="w-30 h-30 rounded-full bg-gray-200 border-2 border-gray-400 flex items-center justify-center"
                                title="프로필 이미지 업로드"
                            >
                                <UserRound size={28} strokeWidth={2.5} className="text-gray-400" />
                            </div>
                        </div>
                        <input 
                            {...register("name")}
                            className={`border border-[#ccc] w-[300px] p-[10px] focus:border-[#807bff] rounded-sm 
                                ${errors?.name ? "border-red-500 bg-red-200" : "border-gray-300"}`} 
                            type={"name"} 
                            placeholder={"이름"}
                        />
                        {errors.name && (<div className="text-red-500 test-sm">{errors.name.message}</div>)}
                        <button
                            type="button"
                            onClick={handleSubmit(onSubmit)}
                            disabled={isSubmitting || !name || !!errors.name}
                            className="w-full bg-pink-200 text-gray-500 py-3 rounded-md hover:bg-pink-300 transition-colors disabled:bg-gray-300 cursor-pointer"
                            >
                            회원가입 완료
                        </button>
                    </>
                )}
                
            </div>
        </div>
    );
};

export default SignupPage;