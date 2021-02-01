module.exports.validateRegisterInput = (
    username,
    email,
    password,
    confirmPassword,
) => {
    const errors = {};
    if (username.trim() === '') {
        errors.username = 'Username must not be empty'
    }
    if (email.trim() === '') {
        errors.email = 'Email must not be empty'
    } else {
        const regEx = /^([0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-\w]*[0-9a-zA-Z]\.)+[a-zA-Z]{2,9})$/;
        if (!email.match(regEx)) {
            errors.email = 'Email must be a valid email addres'
        }
    }
    if (password === '') {
        errors.password = 'Password must not be empty'
    } else if (password !== confirmPassword) {
        errors.confirmPassword = 'Password must be match';

    }
    return {
        errors,
        valid: Object.keys(errors).length < 1
    }
}
module.exports.validateLoginInput = (username, password) => {
    const errors = {};
    if (username.trim() === '') {
        errors.username = 'Username must not be empty'
    }
    if (password.trim() === '') {
        errors.password = 'Password must not be empty'
    }
    return {
        errors,
        valid: Object.keys(errors).length < 1
    };
}
module.exports.validateInput = (body, title) => {
    const errors = {};
    if (body.trim() === '') {
        errors.body = 'Note body must not be empty'
    }
    if (title.trim() === '') {
        errors.title = 'Note title must not be empty'
    }
    return {
        errors,
        valid: Object.keys(errors).length < 1
    };
}