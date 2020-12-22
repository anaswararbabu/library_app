function validate_login(){
    var loginpassword = document.getElementById("password");
    var loginusername = document.getElementById("username");
     const usernameValue = loginusername.value.trim();    
    const loginpasswordValue = loginpassword.value.trim(); 
     var loginInputError =false;

    if(usernameValue ==="")
    {
        loginInputError =true;
        setErrorFor(loginusername, "Username cannot be blank");
    }  else {
        loginInputError =false;
        setSuccessFor(loginusername);
    }

    if(loginpasswordValue ==="")
    {
        loginInputError =true;
        setErrorFor(loginpassword, "Password cannot be blank");
    } 
    else{
        loginInputError =false;
        setSuccessFor(loginpassword);
    }
    return loginInputError;
}

function setErrorFor(input, message){
    
    const formControl = input.parentElement;
    const ptag = formControl.querySelector("p");
    ptag.innerText = message;
    formControl.className = "form_control error";

    return;
}

function setSuccessFor(input){
    const formControl = input.parentElement;
    formControl.className="form_control success";
    
    return;
}