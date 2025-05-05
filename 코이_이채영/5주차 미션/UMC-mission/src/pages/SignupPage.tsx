import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { z } from "zod";
import { postSignup } from "../apis/auth";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import profileImg from "../assets/profile.png";

const schema = z.object({
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
}).refine((data) => data.password === data.passwordCheck, {
    message: "비밀번호가 일치하지 않습니다.",
    path: ["passwordCheck"],
});

type FormField = z.infer<typeof schema>;

const SignupPage = () => {
    const [step, setStep] = useState(1);
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [showPasswordCheck, setShowPasswordCheck] = useState(false);
    const [previewImage, setPreviewImage] = useState<string | null>(null);

    const handleProfileImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewImage(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const { register, handleSubmit, watch, trigger, getValues, formState: { errors, isSubmitting }, } =
        useForm<FormField>({
            defaultValues: {
                name: "",
                email: "",
                password: "",
                passwordCheck: "",
            },
            resolver: zodResolver(schema),
            mode: "onBlur",
        });

    const onSubmit: SubmitHandler<FormField> = async (data) => {
        const { passwordCheck, ...rest } = data;
        const response = await postSignup(rest);
        console.log(response);
    };

    const email = watch("email");
    const password = watch("password");
    const passwordCheck = watch("passwordCheck");

    const handleNext = async () => {
        if (step === 1) {
            const valid = await trigger("email");
            if (valid) setStep(2);
        } else if (step === 2) {
            const valid = await trigger(["password", "passwordCheck"]);
            if (valid) setStep(3);
        }
    };

    const isDisabled =
        (step === 1 && (!email || !!errors.email)) ||
        (step === 2 && (!password || !passwordCheck || !!errors.password || !!errors.passwordCheck)) ||
        (step === 3 && !getValues("name"));

    return (
        <div className="flex flex-col items-center justify-center h-full gap-4">
            <div className="flex flex-col gap-3 w-[350px]">
                <div className="flex items-center justify-center w-full text-white text-2xl pb-6 relative">
                    <button
                        className="absolute left-0 pl-2 text-3xl text-white hover:text-gray-300 transition-colors"
                        onClick={() => {
                            if (step > 1) {
                                setStep(step - 1); // 이전 스텝으로
                            } else {
                                navigate(-1); // 첫 스텝이면 이전 페이지로
                            }
                        }}
                    >
                        &lt;
                    </button>
                    회원가입
                </div>
            </div>

            {step === 1 && (
                <>
                    <div className="flex flex-col gap-3 w-[350px]">
                        <button
                            type="button"
                            className="flex items-center justify-center w-full gap-2 border border-gray-300 text-white rounded-md py-3 px-4 bg-black hover:bg-gray-100 hover:text-black transition-colors"
                        >
                            <svg
                                className="w-5 h-5"
                                version="1.1"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 48 48"
                            >
                                <path
                                    fill="#EA4335"
                                    d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"
                                ></path>
                                <path
                                    fill="#4285F4"
                                    d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"
                                ></path>
                                <path
                                    fill="#FBBC05"
                                    d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"
                                ></path>
                                <path
                                    fill="#34A853"
                                    d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"
                                ></path>
                                <path fill="none" d="M0 0h48v48H0z"></path>
                            </svg>
                            <span className="text-sm font-medium ">구글 로그인</span>
                        </button>
                    </div>


                    <div className="w-[350px] flex items-center gap-8 my-2">
                        <hr className="flex-1 border-gray-300" />
                        <span className="text-white text-lg">OR</span>
                        <hr className="flex-1 border-gray-300" />
                    </div>

                    <input
                        {...register("email")}
                        className={`border bg-black w-[350px] p-[10px] focus:border-[#807bff] rounded-sm text-white 
                            ${errors?.email ? "border-red-500" : "border-gray-300"}`}
                        type="email"
                        placeholder="이메일을 입력해주세요!"
                    />
                    {errors?.email && (
                        <div className="text-red-500 text-sm">{errors.email.message}</div>
                    )}
                </>
            )}

            {step === 2 && (
                <>
                    <div className="flex items-center gap-1 text-white mb-1 w-[350px]">
                        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="20" fill="white" viewBox="0 0 28 28" className="self-center">
                            <path d="M2 4a2 2 0 012-2h16a2 2 0 012 2v12a2 2 0 01-2 2H4a2 2 0 01-2-2V4zm2 0v.511l8 5.333 8-5.333V4H4zm16 2.322l-7.445 4.963a1 1 0 01-1.11 0L4 6.322V16h16V6.322z" />
                        </svg>
                        {getValues("email")}
                    </div>

                    <div className="relative w-[350px]">
                        <input
                            {...register("password")}
                            className={`w-full border bg-black p-[10px] focus:border-[#807bff] rounded-sm text-white pr-10
                                ${errors?.password ? "border-red-500" : "border-gray-300"}`}
                            type={showPassword ? "text" : "password"}
                            placeholder="비밀번호를 입력해주세요!"
                        />
                        <div
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white cursor-pointer"
                        >
                            {showPassword ? <FaEyeSlash /> : <FaEye />}
                        </div>
                    </div>
                    {errors?.password && (
                        <div className="text-red-500 text-sm text-left">{errors.password.message}</div>
                    )}

                    <div className="relative w-[350px]">
                        <input
                            {...register("passwordCheck")}
                            className={`w-full border bg-black p-[10px] focus:border-[#807bff] rounded-sm text-white pr-10
                                ${errors?.passwordCheck ? "border-red-500" : "border-gray-300"}`}
                            type={showPasswordCheck ? "text" : "password"}
                            placeholder="비밀번호를 다시 입력해주세요!"
                        />
                        <div
                            onClick={() => setShowPasswordCheck(!showPasswordCheck)}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white cursor-pointer"
                        >
                            {showPasswordCheck ? <FaEyeSlash /> : <FaEye />}
                        </div>
                    </div>
                    {errors?.passwordCheck && (
                        <div className="text-red-500 text-sm text-left">{errors.passwordCheck.message}</div>
                    )}
                </>
            )}

            {step === 3 && (
                <>
                    <div className="flex flex-col items-center mb-4">
                        <label htmlFor="profileImage" className="cursor-pointer">
                            <img
                                src={previewImage || profileImg}
                                alt="프로필 이미지"
                                className="w-30 h-30 rounded-full object-cover border-2 border-gray-300"
                            />
                        </label>
                        <input
                            id="profileImage"
                            type="file"
                            accept="image/*"
                            onChange={handleProfileImageChange}
                            className="hidden"
                        />
                    </div>
                    <input
                        {...register("name")}
                        className={`border bg-black w-[350px] p-[10px] focus:border-[#807bff] rounded-sm text-white
                            ${errors?.name ? "border-red-500" : "border-gray-300"}`}
                        type="name"
                        placeholder="이름을 입력해주세요!"
                    />
                    {errors?.name && (
                        <div className="text-red-500 text-sm">{errors.name.message}</div>
                    )}
                </>
            )}

            {step < 3 ? (
                <button
                    type="button"
                    onClick={handleNext}
                    className="w-[350px] bg-[#ff1490] text-white py-3 rounded-md text-lg font-medium hover:bg-pink-700 transition-colors disabled:bg-[#333]"
                    disabled={
                        isDisabled ||
                        (step === 1 && !email) ||
                        (step === 2 && (!password || !passwordCheck))
                    }
                >
                    다음
                </button>
            ) : (
                <button
                    type="button"
                    onClick={handleSubmit(onSubmit)}
                    disabled={isSubmitting}
                    className="w-[350px] bg-[#ff1490] text-white py-3 rounded-md text-lg font-medium hover:bg-pink-700 transition-colors disabled:bg-[#333]"
                >
                    회원가입 완료
                </button>
            )}
        </div>
    );
};

export default SignupPage;