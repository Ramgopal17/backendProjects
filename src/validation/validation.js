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
exports.passwordValidate = function (value) {
    let regex = /^(?=.*[0-9 ])(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z])([a-zA-Z0-9!@#$%^&*]{8,15})$/
    return regex.test(value)
}
exports.validCityAndstate = function (value) {
    let cityAndStateRegex=/([A-Za-z]+(?: [A-Za-z]+)*),? ([A-Za-z]{2})/
        return cityAndStateRegex.test(value)
}
  
exports.validFacebookLink=function (value){
    let facebookRegex=/(?:(?:http|https):\/\/)?(?:www.|m.)?facebook.com\/(?!home.php)(?:(?:\w)*#!\/)?(?:pages\/)?(?:[?\w\-]*\/)?(?:profile.php\?id=(?=\d.*))?([\w\.-]+)/
    return facebookRegex.test(value)
}
exports.validInstaLink=function (value){
   
    let instaRegex=/(?:(?:http|https):\/\/)?(?:www.)?(?:instagram.com|instagr.am|instagr.com)\/(\w+)/igm
      return  instaRegex.test(value)
}
exports.validYoutubeLink=function (value){
    let youtubeLinkRegex=/http(?:s?):\/\/(?:www\.)?youtu(?:be\.com\/watch\?v=|\.be\/)([\w\-\_]*)(&(amp;)?‌​[\w\?‌​=]*)?/
    return youtubeLinkRegex.test(value)
}
exports.validPinCode=function(value){
    let regexPostal=/^[1-9]{1}[0-9]{2}\\s{0, 1}[0-9]{3}$/;
    return regexPostal.test(value)
}
exports.digitValidation=function(value){
    let regex=/^[0-9]*$/
    return regex.test(value)
}
exports.dateValidation=function(value){
    let dateRegex=/^(0?[1-9]|[12][0-9]|3[01])[\/\-](0?[1-9]|1[012])[\/\-]\d{4}$/
    return dateRegex.test(value)
}
   
   
    