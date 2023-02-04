exports.isValid = function (value) {
    if (typeof value === "undefined" || value === null) return false
    if (typeof value === "string" && value.trim().length === 0) return false
    return true
}

exports.validName= function (value) {
    let nameRegex=/^[A-Za-z][a-z]*(([,.] |[ '-])[A-Za-z][a-z]*)*(\.?)( [IVXLCDM]+)?$/
    return nameRegex.test(value)

}
exports.validMobNum= function (value) {

    let mobileRegex=/^[7-9][0-9]{9}$/
        return mobileRegex.test(value)
    }

exports.validateEmail = (email) => {
    return String(email)
        .toLowerCase()
        .match(
            /^[a-zA-Z _\.\-0-9]+[@][a-z]{3,6}[.][a-z]{2,4}$/
);
}
exports.validCity = function (value) {
    let cityRegex=/^[a-zA-Z\u0080-\u024F\s\/\-\)\(\`\.\"\']+$/

        return cityRegex.test(value)
}


exports.validState = function (value) {
    let stateRegex=/[A-Z][a-z]+(?: +[A-Z][a-z]+)*/

        return stateRegex.test(value)
}
exports.validPinCode=function(value){
    let regexPostal=/^[1-9][0-9]{5}$/
    return regexPostal.test(value)
}

exports.validDrivingLic=function(value){
    const dlRegex = /^(([A-Z]{2}[0-9]{2})( )|([A-Z]{2}-[0-9]{2}))((19|20)[0-9][0-9])[0-9]{7}$/; 
    return dlRegex.test(value)
}