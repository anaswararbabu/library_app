const form          = document.getElementById("form");
const firstname     = document.getElementById("first-name");
const lastname      = document.getElementById("last-name");
const email         = document.getElementById("email");
const username      = document.getElementById("username");
const password      = document.getElementById("password");
const password2     = document.getElementById("password2");
let passwordStrength = document.getElementById("password-strength");
let lowerUpperCase = document.querySelector(".low-upper-case");
let number = document.querySelector(".one-number");
let specialChar = document.querySelector(".one-special-char");
let eightChar = document.querySelector(".eight-character");

function validate_signup(){  
    const firstnameValue = firstname.value.trim();
    const lastnameValue = lastname.value.trim(); 
    const emailValue = email.value.trim();    
    const usernameValue = username.value.trim();     
    const passwordValue = password.value.trim(); 
    const password2Value = password2.value.trim();

    var inputError =false;

    if(firstnameValue ==="")
    {   
        inputError =true;
        setErrorFor(firstname, "First Name cannot be blank");
    } else{
        inputError =false;
        setSuccessFor(firstname);
    }

    if(lastnameValue ==="")
    {
        inputError =true;
        setErrorFor(lastname, "Last Name cannot be blank");
    } else{
        inputError =false;
        setSuccessFor(lastname);
    }

    if(emailValue ==="")
    {
        inputError =true;
        setErrorFor(email, "Email cannot be blank");
    } else if(!isEmailValid(emailValue)){
        inputError =true;
        setErrorFor(email, "Email is not valid");
    } else {
        inputError =false;
        setSuccessFor(email);
    }

    if(usernameValue ==="")
    {
        inputError =true;
        setErrorFor(username, "Username cannot be blank");
    } else if (!isUsernameValid(usernameValue)){
        inputError =true;
        setErrorFor(username, "Must be atleast 8 characters with atleast 1 letter & 1 number");
    } else{
        inputError =false;
        setSuccessFor(username);
    }

    if(passwordValue ==="")
    {
        inputError =true;
        setErrorFor(password, "Password cannot be blank");
    } else if(!isPasswordValid(passwordValue)){
        inputError =true;
        setErrorFor(password, "Password is not valid");
    } else{
        inputError =false;
        setSuccessFor(password);
    }

    if(password2Value ==="")
    {
        inputError =true;
        setErrorFor(password2, "Password should be retyped");
    } else if(passwordValue !== password2Value){
        inputError =true;
        setErrorFor(password2, "Passwords does not match");
    } else{
        inputError =false;
        setSuccessFor(password2);
    }

    return inputError;
}

function setErrorFor(input, message){
    const formControl = input.parentElement; 
    const ptag = formControl.querySelector("p");

    ptag.innerText = message;

    formControl.className = "form_control error";
}

function setSuccessFor(input){
    const formControl = input.parentElement;
    formControl.className="form_control success";
}


function isEmailValid(email){
    return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email);
}

function isUsernameValid(username){
    return /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(username);
}


function showpsw(el){
	if(password.type === "password"){
		password.type ="text";
		el.className="fa fa-eye-slash";
	}
	else{
		password.type= "password";
		el.className="fa fa-eye";
	}
}
function showpswc(el){
	if(confirmpassword.type === "password"){
		confirmpassword.type ="text";
		el.className="fa fa-eye-slash";
	}
	else{
		confirmpassword.type= "password";
		el.className="fa fa-eye";
	}
}
let txt1 = document.querySelector(".txt1");
let txt = document.querySelector(".txt");
let regweak = /[a-z]/;
let regwk = /[A-Z]/;
let regmed = /\d+/;
let regstr = /.[!,@,#,$,%,^,&,*,?,_,~,-,(,)]/;
function strength(){
	if(password.value!= ""){
		txt1.style.display = "block";
		txt1.textContent= "Password Strength: ";
		if(password.value.length<=3){
			no=0
		}
		if(password.value.length >=4 && (password.value.match(regweak) || password.value.match(regwk) || password.value.match(regmed) || password.value.match(regstr))){
				no=1;
		}
		if(password.value.length >=6 && ((password.value.match(regweak) && password.value.match(regmed)) || (password.value.match(regmed) && password.value.match(regstr)) || (password.value.match(regweak) && password.value.match(regstr)))){
			no=2;
		}
		if(password.value.length >=6 && ((password.value.match(regwk) && password.value.match(regmed)) || (password.value.match(regweak) && password.value.match(regwk)) || (password.value.match(regwk) && password.value.match(regstr)))){
			no=2;
		}
		if(password.value.length >=8 && password.value.match(regweak) && password.value.match(regwk)  && password.value.match(regmed) && password.value.match(regstr)){
			no=3;
		}
		if (no == 0){

			txt.style.display = "block";
			txt.textContent= "Weak";
			txt.classList.add("vweak");
		}
		if (no == 1){
			txt.style.display = "block";
			txt.textContent= "Medium";
			txt.classList.add("weak");
		}else{
			txt.classList.remove("weak");
		}
		if (no == 2){
			txt.style.display = "block";
			txt.textContent= "Fair";
			txt.classList.add("med");
		}else{
			txt.classList.remove("med");
		}
		if (no == 3){
			txt.textContent= "Strong";
			txt.classList.add("str");
		}else{
			txt.classList.remove("str");
		}
	}
	else{
		txt.style.display="none";
		txt1.style.display="none";
	}
}


