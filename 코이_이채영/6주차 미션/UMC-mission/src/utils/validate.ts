export type UserSignInformation = {
    email: string;
    password: string;
};

function validateUser(values: UserSignInformation) {
    const errors = {
        email: "",
        password: "",
    };

    if (!/^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i.test(values.email,)) {
        errors.email = "올바른 이메일 형식을 입력해주세요.";
    }

    if (!(values.password.length >= 8 && values.password.length < 20)) {
        errors.password = "비밀번호는 8자 이상이어야 합니다."
    }

    return errors;
}

function validateSignin(values: UserSignInformation) {
    return validateUser(values);
}

export { validateSignin };