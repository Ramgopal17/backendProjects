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
   
   
    