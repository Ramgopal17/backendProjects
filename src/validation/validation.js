

const isValid = function (value) {
    if (typeof value === "undefined" || value === null) return false
    if (typeof value === "string" && value.trim().length === 0) return false
    return true
}

const validateEmail = (email) => {
    return String(email)
        .toLowerCase()
        .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
}
const passwordValidate = function (value) {
    let regex = /^[a-zA-Z0-9_@]{8,15}$/
   

    return regex.test(value)
}
const validName = (name) => {
    return String(name)
        .toLowerCase()
        .match(/^[a-zA-Z ]+$/)

           
}

module.exports = { isValid, validateEmail,passwordValidate ,validName}