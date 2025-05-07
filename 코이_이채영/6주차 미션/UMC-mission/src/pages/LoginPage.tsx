import { useNavigate } from "react-router-dom";
import useForm from "../hooks/useForm";
import { UserSignInformation, validateSignin } from "../utils/validate";
import { useAuth } from "../context/AuthContext";
import { useEffect } from "react";


const LoginPage = () => {
    const { login, accessToken } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (accessToken) {
            navigate('/');
        }
    }, [navigate, accessToken]);

    const { values, errors, touched, getInputProps } =
        useForm<UserSignInformation>({
            initialValue: {
                email: "",
                password: "",
            },
            validate: validateSignin,
        });

    const handleSubmit = async () => {
        await login(values);
    };

    const handleGoogleLogin = () => {
        window.location.href = import.meta.env.VITE_SERVER_API_URL + "/v1/auth/google/login"
    }

    const isDisabled =
        Object.values(errors || {}).some((error) => error.length > 0) ||
        Object.values(values).some((value) => value === "");

    return (
        <div className="flex flex-col items-center justify-center h-full gap-4">
            <div className="flex flex-col gap-3 ">
                <div className="w-[350px]">
                    <div className="flex items-center justify-center w-full text-white text-2xl pb-6 relative">
                        <button
                            className="absolute left-0 pl-2 text-3xl text-white hover:text-gray-300 transition-colors"
                            onClick={() => navigate(-1)}
                        >
                            &lt;
                        </button>
                        로그인
                    </div>
                    <button
                        type="button"
                        onClick={handleGoogleLogin}
                        className="flex items-center justify-center w-full gap-2 border border-gray-300 text-white rounded-md py-3 px-4 bg-black hover:bg-gray-100 hover:text-black transition-colors"
                    >
                        {/* Google Icon */}
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
                    {...getInputProps('email')}
                    name="email"
                    className={`border bg-black w-[350px] p-[10px] focus:border-[#807bff] rounded-sm text-white
                        ${errors?.email && touched?.email ? "border-red-500 " : "border-gray-300 bg-black"}`}
                    type="email"
                    placeholder="이메일을 입력해주세요!"
                />
                {errors?.email && touched?.email && (
                    <div className="text-red-500 text-sm">{errors.email}</div>
                )}

                <input
                    {...getInputProps('password')}
                    name="password"
                    type="password"
                    placeholder="비밀번호를 입력해주세요!"
                    className={`border w-[350px] p-[10px] focus:border-[#807bff] rounded-sm text-white
                        ${errors?.password && touched?.password ? "border-red-500" : "border-gray-300"}`}
                />
                {errors?.password && touched?.password && (
                    <div className="text-red-500 text-sm">{errors.password}</div>
                )}

                <button
                    type="button"
                    onClick={handleSubmit}
                    disabled={isDisabled}
                    className="w-[350px] bg-[#ff1490] text-white py-3 rounded-md text-lg font-medium hover:bg-pink-700 transition-colors disabled:bg-[#333]"
                >
                    로그인
                </button>
            </div>
        </div>
    );

};

export default LoginPage;