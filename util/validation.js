function isEmpty(value) {
    return !value || !value.trim() === '';
}

function userCredentialsAreValid(email, password, confirmPassword) {
    return email && email.includes('@') && password && password.trim().length > 5 && confirmPassword && confirmPassword.trim().length > 5
}

function userDetailsAreValid(email, password, confirmPassword, name, address, city, postal,) {
    return (
        userCredentialsAreValid(email, password, confirmPassword) &&
        !isEmpty(name) &&
        !isEmpty(address) &&
        !isEmpty(city) &&
        !isEmpty(postal)
    );
}
function PasswordIsConfirmed(passowrd, confirmPassword) {
    return passowrd === confirmPassword;

}

module.exports = {
    userDetailsAreValid: userDetailsAreValid,
    PasswordIsConfirmed: PasswordIsConfirmed,
}