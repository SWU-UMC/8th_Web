import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import {z} from "zod";
import { postSignup } from "../apis/auth";
import { useState } from "react";
import { Link } from "react-router-dom";

const schema=z.object({
  email: z.string().email({message: "올바른 이메일 형식이 아닙니다."}),
  password: z.string()
  .min(8,{
    message: "비밀번호는 8자 이상이어야 합니다"
  }).max(20,{
    message: "비밀번호는 20자 이하여야 합니다.",
  }),
  passwordCheck: z.string()
  .min(8,{
    message: "비밀번호는 8자 이상이어야 합니다"
  }).max(20,{
    message: "비밀번호는 20자 이하여야 합니다.",
  }),
  name: z.string().min(1,{message:"이름을 입력해주세요."})
  })
  .refine((data) => data.password===data.passwordCheck,{
    message:"비밀번호가 일치하지 않습니다.",
    path:["passwordCheck"],
});

type FormFields=z.infer<typeof schema>

const SignupPage = () => {
  const [step, setStep] = useState(1);
  const [showPassword, setshowPassword]=useState(false);
  const [showPasswordCheck, setShowPasswordCheck] = useState(false);
  const [email, setEmail]= useState("");
  
  

    const {register, handleSubmit,
          formState: {errors, isSubmitting, isValid},trigger, getValues
        }=useForm<FormFields>({
      defaultValues: {
        name: '',
        email: "",
        password: '',
      },
      resolver: zodResolver(schema),
      mode:"onChange"
    })

    const values=getValues();

    const handleNextStep = async () => {
      
      if (step === 1) {
        const isValid = await trigger('email');
        if(isValid){
          setEmail(getValues('email'))
          setStep(2)
        }
      } else if (step === 2) {
        const isValid = await trigger(['password', 'passwordCheck']);
        if(isValid) {
          setStep(3);
        }
      }
    };

    
    const onSubmit: SubmitHandler<FormFields> = async (data) => {
      if (step < 3) {
        return; // 최종 단계가 아니면 제출하지 않음
      }
      
      console.log("최종 제출 데이터:", data);
      const { passwordCheck, ...rest } = data;
      
      try {
        const response = await postSignup(rest);
        console.log("회원가입 응답:", response);
      } catch (error) {
        console.error("회원가입 에러:", error);
      }
    };

    const isDisabled=
    Object.values(errors || {}).some((error)=> error !== undefined) ||
    Object.values(values).some((value)=> value==="");

      
    return (
      <div className="flex flex-col items-center justify-center h-full gap-4">
        <div className="flex flex-col text-white gap-3">
          <div className="relative w-full h-12 flex items-center">
            {step > 1 && (
              <button
              onClick={() => setStep((prev) => prev - 1)}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-2xl hover:text-red-500"
            >
              &lt;
              </button>
            )}
            <Link to="/" className="absolute left-4 top-1/2 -translate-y-1/2">
              <span className="text-2xl text-white cursor-pointer hover:text-red-500">&lt;</span>
            </Link>
            <h1 className="absolute left-1/2 text-white top-1/2 -translate-x-1/2 -translate-y-1/2 text-xl font-semibold">
              회원가입
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

        <form onSubmit={handleSubmit(onSubmit)}>
        {/* STEP 1: 이메일 */}
        {step === 1 && (
          <>
          <div className="flex flex-col gap-4 w-full ">
            <input 
              {...register('email')}
              type="email"
              placeholder="이메일"
              className={`border w-[300px] p-[10px] rounded-sm ${
                errors?.email ? "border-red-500 bg-red-200" : "border-gray-300"
              }`}
            />
            {errors.email && (
              <div className="text-red-500 text-sm">{errors.email.message}</div>
            )}

            <button
              type="button"
              onClick={handleNextStep}
              disabled={isSubmitting||!!errors.email || !getValues('email')}
              className={`w-full py-3 text-white rounded-md text-lg font-medium transition-colors ${
                !!errors.email || !getValues('email') 
                  ? "bg-gray-400 cursor-not-allowed" 
                  : "bg-pink-500 hover:bg-pink-700"
              }`}

            >
              다음
            </button>
            </div>
          </>
        )}

        {/* STEP 2: 비밀번호 & 확인 */}
        {step === 2 && (
          <>         
          <div className="flex flex-col ray-400 gap-3">{email}
            <div className="flex flex-col w-full relative">
            <input             
              {...register('password')} 
              className={`border border-[#ccc] w-[300px] p-[10px] focus: border-[#807bff] rounded-sm
                ${errors?.password ? "border-red-500 bg-red-200": "border-gray-300"}`}
              type={showPassword? "text" : "password"}
              placeholder={"비밀번호"}
            />
            {errors.password && (
              <p className={"text-red-500 text-sm mt-1"}>{errors.password.message}</p>
            )}
            <button
              type="button"
              onClick={() => setshowPassword(prev => !prev)}
              className="absolute right-3 top-2 text-sm text-white"
              >
              {showPassword ? "close" : "👀"}
            </button>
            </div>

            <div className="flex flex-col w-full relative">
            <input
              {...register('passwordCheck')}
              type="password"
              placeholder="비밀번호를 다시 한번 입력해주세요!"
              className={`border w-[300px] p-[10px] rounded-sm ${
                errors?.passwordCheck ? "border-red-500 bg-red-200" : "border-gray-300"
              }`}
            />
            {errors.passwordCheck && (
              <div className="text-red-500 text-sm">{errors.passwordCheck.message}</div>
            )}
            <button
              type="button"
              onClick={() => setShowPasswordCheck(prev => !prev)}
              className="absolute right-3 top-2 text-sm text-white"
              >
              {showPasswordCheck ? "close" : "👀"}
            </button>
            
            <button
                type="button"
                onClick={handleNextStep}
                disabled={isSubmitting||!!errors.password || !getValues('password')}
                className={`w-full py-3 text-white rounded-md text-lg font-medium transition-colors ${
                      !!errors.password || !getValues('password') 
                        ? "bg-gray-400 cursor-not-allowed" 
                        : "bg-pink-500 hover:bg-pink-700"
              }`}
              >
                다음
              </button>
            </div>
            </div>
          </>
        )}

        {/* STEP 3: 이름 */}
        {step === 3 && (
          <>
            <div className="flex flex-col w-full gap-3">
            <input
              {...register('name')}
              type="text"
              placeholder="이름"
              className={`border w-[300px] p-[10px] rounded-sm ${
                errors?.name ? "border-red-500 bg-red-200" : "border-gray-300"
              }`}
            />
            {errors.name && (
              <div className="text-red-500 text-sm">{errors.name.message}</div>
            )}       
            <button
              disabled={isSubmitting || !!errors.name ||!getValues('name')}
              type="button"
              onClick={handleSubmit(onSubmit)}
              className={`w-full text-white py-3 rounded-md text-lg font-medium 
                transition-colors ${
                  !!errors.name || !getValues('name')
                    ? "bg-gray-400 cursor-not-allowed" 
                    : "bg-pink-500 hover:bg-pink-700"
                }`}
            >
              회원가입 완료!
            </button>
            </div>
            </>
           )}
        </form>
      </div>
    </div>

    )
  }
  
  export default SignupPage;