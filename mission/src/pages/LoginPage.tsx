import useForm from "../hooks/useForm.ts";
import { UserSigninInformagion, validateSignin } from "../utils/validate.ts";
import { useAuth } from "../context/AuthContext.tsx";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";

const LoginPage = () => {
  const { login, accessToken } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (accessToken) {
      navigate("/");
    }
  }, [navigate, accessToken]);

  const { values, errors, touched, getInputProps } =
    useForm<UserSigninInformagion>({
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
    window.location.href =
      import.meta.env.VITE_SERVER_API_URL + "/v1/auth/google/login";
  };

  const isDisabled =
    Object.values(errors || {}).some((error) => error.length > 0) ||
    Object.values(values).some((value) => value === "");

  return (
    <div className="flex flex-col items-center justify-center h-full gap-4 bg-black text-white">
      <div className="flex flex-col items-center gap-3">
        {/* 상단 뒤로가기 및 제목 */}
        <div className="relative w-[300px] h-12 flex items-center">
          <Link
            to="/"
            className="absolute left-0 top-1/2 -translate-y-1/2 text-white hover:text-pink-400 text-xl"
          >
            &lt;
          </Link>
          <h1 className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 text-xl font-semibold text-white">
            로그인
          </h1>
        </div>

        {/* 구글 로그인 버튼 */}
        <button
          type="button"
          onClick={handleGoogleLogin}
          className="w-[300px] border border-gray-400 text-white py-2 rounded-md flex items-center justify-center gap-2 hover:border-white transition-colors"
        >
          <img src="/google-logo.png" alt="Google Logo" className="w-5 h-5" />
          <span className="font-medium">구글 로그인</span>
        </button>

        {/* OR 구분선 */}
        <div className="flex items-center justify-center gap-4 w-[300px]">
          <div className="border-t border-gray-500 flex-grow" />
          <span className="text-gray-400 text-sm">OR</span>
          <div className="border-t border-gray-500 flex-grow" />
        </div>

        <input
          {...getInputProps("email")}
          name="email"
          className={`bg-black border w-[300px] p-[10px] rounded-md text-white 
            ${
              errors?.email && touched?.email
                ? "border-red-500"
                : "border-gray-500"
            }`}
          type={"email"}
          placeholder={"이메일"}
        />
        {errors?.email && touched?.email && (
          <div className="text-red-500 text-sm">{errors.email}</div>
        )}
        <input
          {...getInputProps("password")}
          className={`bg-black border w-[300px] p-[10px] rounded-md text-white 
            ${
              errors?.password && touched?.password
                ? "border-red-500"
                : "border-gray-500"
            }`}
          type={"password"}
          placeholder={"비밀번호"}
        />
        {errors?.password && touched?.password && (
          <div className="text-red-500 text-sm">{errors.password}</div>
        )}
        <button
          type="button"
          onClick={handleSubmit}
          disabled={isDisabled}
          className={`w-[300px] py-3 rounded-md text-white font-medium transition-colors ${
            isDisabled
              ? "bg-gray-700 cursor-not-allowed"
              : "bg-pink-500 hover:bg-pink-600"
          }`}
        >
          로그인
        </button>
      </div>
    </div>
  );
};

export default LoginPage;
