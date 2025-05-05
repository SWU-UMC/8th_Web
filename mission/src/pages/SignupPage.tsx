import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { postSignup } from "../apis/auth";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { ChevronLeft, Eye, EyeClosed, Mail, UserRound } from "lucide-react";

const schema = z
  .object({
    email: z.string().email({ message: "올바른 이메일 형식이 아닙니다." }),
    password: z
      .string()
      .min(8, { message: "비밀번호는 8자 이상이어야 합니다." })
      .max(20, { message: "비밀번호는 20자 이하여야 합니다." }),
    passwordCheck: z
      .string()
      .min(8, { message: "비밀번호는 8자 이상이어야 합니다." })
      .max(20, { message: "비밀번호는 20자 이하여야 합니다." }),
    name: z.string().min(1, { message: "이름을 입력해주세요." }),
  })
  .refine((data) => data.password === data.passwordCheck, {
    message: "비밀번호가 일치하지 않습니다.",
    path: ["passwordCheck"],
  });

type FormFields = z.infer<typeof schema>;

const SignupPage = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [showPw, setShowPw] = useState(false);
  const [showPwCheck, setShowPwCheck] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
  } = useForm<FormFields>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      passwordCheck: "",
    },
    resolver: zodResolver(schema),
    mode: "onBlur",
  });

  const email = watch("email");
  const password = watch("password");
  const passwordCheck = watch("passwordCheck");
  const name = watch("name");

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    console.log("submit:", data);
    const { passwordCheck, ...rest } = data;

    const response = await postSignup(rest);

    console.log(response);
    navigate("/login"); // 회원가입 성공하면 로그인 페이지로 이동
  };

  return (
    <div className="flex flex-col items-center justify-center h-full bg-black text-white">
      <div className="w-[300px] flex items-center justify-between px-2 py-2 relative">
        <button
          onClick={() => navigate(-1)}
          className="cursor-pointer text-white"
        >
          <ChevronLeft size={24} />
        </button>
        <h1 className="text-xl font-semibold absolute left-1/2 -translate-x-1/2 text-white">
          회원가입
        </h1>
        <div className="w-6" />
      </div>
      <div className="flex flex-col gap-3">
        {step === 1 && (
          <>
            <button
              type="button"
              onClick={() => {
                window.location.href =
                  import.meta.env.VITE_SERVER_API_URL + "/v1/auth/google/login";
              }}
              className="w-full border border-gray-600 rounded py-2 px-4 flex justify-center items-center gap-2"
            >
              <img
                src="/google-logo.png"
                alt="Google logo"
                className="w-5 h-5"
              />
              <span>구글 로그인</span>
            </button>

            <div className="flex items-center justify-center gap-4">
              <div className="border-t border-gray-600 flex-grow"></div>
              <span className="text-gray-400 text-sm">OR</span>
              <div className="border-t border-gray-600 flex-grow"></div>
            </div>
            <input
              {...register("email")}
              className={`bg-black border w-[300px] p-[10px] rounded-md text-white placeholder-white 
                                ${
                                  errors?.email
                                    ? "border-red-500 bg-red-200"
                                    : "border-gray-300"
                                }`}
              type={"email"}
              placeholder={"이메일"}
            />
            {errors.email && (
              <div className="text-red-500 test-sm">{errors.email.message}</div>
            )}
            <button
              type="button"
              className={`w-full py-3 rounded-md text-sm font-semibold
        ${
          !email || errors.email
            ? "bg-[#1b1b1b] text-gray-500 cursor-not-allowed"
            : "bg-[#ff2aa3] text-white hover:bg-pink-500 transition-colors"
        }`}
              disabled={!email || !!errors.email}
              onClick={() => setStep(2)}
            >
              다음
            </button>
          </>
        )}
        {step === 2 && (
          <>
            <div className="flex items-center gap-2 text-sm mb-1 text-white">
              <Mail size={16} className="text-black" />
              <span className="font-semibold text-black">{email}</span>
            </div>
            <div className="relative w-[300px]">
              <input
                {...register("password")}
                className={`bg-black border w-[300px] p-[10px] rounded-md text-white placeholder-white 
                                    ${
                                      errors?.password
                                        ? "border-red-500 bg-red-200"
                                        : "border-gray-300"
                                    }`}
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
            {errors.password && (
              <div className="text-red-500 test-sm">
                {errors.password.message}
              </div>
            )}

            <div className="relative w-[300px]">
              <input
                {...register("passwordCheck")}
                className={`bg-black border w-[300px] p-[10px] rounded-md text-white placeholder-white 
                                    ${
                                      errors?.passwordCheck
                                        ? "border-red-500 bg-red-200"
                                        : "border-gray-300"
                                    }`}
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
            {errors.passwordCheck && (
              <div className="text-red-500 test-sm">
                {errors.passwordCheck.message}
              </div>
            )}
            <button
              type="button"
              className="w-full py-3 rounded-md text-sm font-semibold"
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
                <UserRound size={40} strokeWidth={2.5} className="text-white" />
              </div>
            </div>
            <input
              {...register("name")}
              className={`bg-black border w-[300px] p-[10px] rounded-md text-white placeholder-white 
                                ${
                                  errors?.name
                                    ? "border-red-500 bg-red-200"
                                    : "border-gray-300"
                                }`}
              type={"name"}
              placeholder={"이름"}
            />
            {errors.name && (
              <div className="text-red-500 test-sm">{errors.name.message}</div>
            )}
            <button
              type="button"
              onClick={handleSubmit(onSubmit)}
              disabled={isSubmitting || !name || !!errors.name}
              className={`w-full py-3 rounded-md text-sm font-semibold
                ${
                  !name || errors.name
                    ? "bg-[#1b1b1b] text-gray-500 cursor-not-allowed"
                    : "bg-[#ff2aa3] text-white hover:bg-pink-500 transition-colors"
                }`}
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
