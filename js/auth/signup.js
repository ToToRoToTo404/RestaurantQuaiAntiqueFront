//Implémenter le JS de ma page

const inputNom = document.getElementById("nomImput");
const inputPreNom = document.getElementById("PrenomImput");
const inputMail = document.getElementById("EmailImput");
const inputPassword = document.getElementById("PasswordImput");
const inputValidationPassword = document.getElementById("ValidatePasswordImput");
const btnValidation = document.getElementById("btn-validation-inscription");

inputNom.addEventListener("keyup", validateForm); // on ajoute un écouteur d'événement sur l'input nom
inputPreNom.addEventListener("keyup", validateForm); // on ajoute un écouteur d'événement sur l'input prénom
inputMail.addEventListener("keyup", validateForm); // on ajoute un écouteur d'événement sur l'input mail
inputPassword.addEventListener("keyup", validateForm); // on ajoute un écouteur d'événement sur l'input password
inputValidationPassword.addEventListener("keyup", validateForm); // on ajoute un écouteur d'événement sur l'input validation password

// Fonction qui va permettre de valider le formulaire
function validateForm() {
    const nomOk = validateRequired(inputNom);
    const prenomOk =  validateRequired(inputPreNom);
    const mailOk = validateMail(inputMail);
    const passwordOk = ValidatePassword(inputPassword);
    const passwordComfirmOk = validateConfirmationPassword(inputPassword, inputValidationPassword);


    if(nomOk && prenomOk && mailOk && passwordOk && passwordComfirmOk) {
        btnValidation.disabled = false;
    } else {
        btnValidation.disabled = true;
    }
}




function validateMail(input) {
    // Définir mon regex pour l'email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const mailUser = inputMail.value;
    if(mailUser.match(emailRegex)) {
        input.classList.add("is-valid");
        input.classList.remove("is-invalid");
        return true;
    }
    else {
        input.classList.remove("is-valid");
        input.classList.add("is-invalid");
        return false;

    }

}

function ValidatePassword(input) {
    const passwordRegex =  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_])[A-Za-z\d\W_]{8,}$/;
    const passwordUser = input.value;
    if(passwordUser.match(passwordRegex)) {
        input.classList.add("is-valid");
        input.classList.remove("is-invalid");
        return true;
    }
    else {
        input.classlist.remove("is-valid");
        input.classList.add("is-invalid");
        return false;
    }
    }

function validateConfirmationPassword(inputPwd, inputConfirmPwd){
    if(inputPwd.value == inputConfirmPwd.value){
        inputConfirmPwd.classList.add("is-valid");
        inputConfirmPwd.classList.remove("is-invalid");
         return true;
    }
    else{
        inputConfirmPwd.classList.add("is-invalid");
        inputConfirmPwd.classList.remove("is-valid");
        return false;
    }
    

    }

function validateRequired(input) {
    if(input.value != '') {
        input.classList.add("is-valid");
        input.classList.remove("is-invalid");
        return true;
        
    }
    else {
        input.classlist.remove("is-valid");
        input.classList.add("is-invalid");
        return false;
    }

}
