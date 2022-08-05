

const isValid = function (value) {
    if (typeof value === "undefined" || value === null) return false
    if (typeof value === "string" && value.trim().length === 0) return false
    return true
}

const validateEmail = (email) => {
    return String(email)
        .toLowerCase()
        .match(
            /^[a-zA-Z _\.\-0-9]+[@][a-z]{3,6}[.][a-z]{2,4}$/

        );
}
const passwordValidate = function (value) {
    let regex = /^(?=.*[0-9 ])(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z])([a-zA-Z0-9!@#$%^&*]{8,15})$/
    return regex.test(value)
}
const validName = (name) => {
    return String(name)
        .toLowerCase()
        .match(/^[a-zA-Z ]+$/)
}
const validField = (name) => {
    return String(name)
        .toLowerCase()
        .match(/^[a-zA-Z0-9 ]+$/)
}

let isValidSize = function(sizes)  {
    return ['S', 'XS', 'M', 'X', 'L', 'XXL', 'XL'].includes(sizes);
}



module.exports = { isValid, validateEmail, passwordValidate, validName, isValidSize,validField }