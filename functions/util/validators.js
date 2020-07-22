const isEmpty = (string) => {
    if(string.trim() === ''){
        return true;
    }else{
        return false;
    }
}
const isEmail = (email) => {
    const regEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if(email.match(regEx)){
        return true;
    }else{
        return false;
    }
}
exports.validateSignupData = (data) => {
    let errors = {};
    if(isEmpty(data.email)){
        errors.email = 'Must not be Empty'
    }else if(!isEmail(data.email)){
        errors.email = 'Email must not be a valid email address'
    }
    if(isEmpty(data.password)){
        errors.password = 'Must not be empty'
    }
    if(data.password !== data.confirmPassword){
        errors.confirmPassword = 'Passwords must match'
    }
    if(isEmpty(data.fullName)){
        errors.fullName = 'Must not be empty'
    }
    return {
        errors,
        valid: Object.keys(errors).length === 0 ? true : false
    }
    
}
exports.validateLoginData = (data) => {
    let errors = {};
    if(isEmpty(data.email)){
        errors.email="Please sign in with your email";
        
    }
    if(isEmpty(data.password)){
        errors.password = 'Must not be empty'
    }
    return {
        errors,
        valid: Object.keys(errors).length === 0 ? true : false
    }
}
exports.validateReservationData = (data) => {
    let errors = {}
    if(data.endDate == ""){
        errors.endDate = "Please enter a valid end date"
    }
    if(data.startDate == ""){
        errors.startDate = "Please enter a valid start date"
    }
    if(isNaN(data.attendants)){
        errors.attendants = "Please enter the number of attendants"
    }
    if(data.location == ""){
        errors.location = "Please enter a valid location"
    }
    return {
        errors,
        valid: Object.keys(errors).length === 0 ? true : false
    }
}