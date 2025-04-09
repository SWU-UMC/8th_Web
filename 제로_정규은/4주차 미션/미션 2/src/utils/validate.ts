export type UserSigninInformation = {
    email: string,
    password: string
}

function validateUser(values: UserSigninInformation) {
    const errors = {
        email: "",
        password: ""
    }

    if ( //이메일 유효성 검사
        !/^[A-Za-z0-9_\.\-]+@[A-Za-z0-9\-]+\.[A-za-z0-9\-]+/.test(
        values.email,
        )
    )   {
            errors.email = "올바른 형식이 아닙니다.";
    }

    // 비밀번호 8~20자 사이
    if (!(values.password.length >= 8 && values.password.length < 20)) {
        errors.password = "비밀번호는 8~20자 사이로 입력해주세요.";
    }

    return errors;
}

// 로그인 유효성 검사
function validateSignin(values: UserSigninInformation) {
    return validateUser(values)
}

export { validateSignin }