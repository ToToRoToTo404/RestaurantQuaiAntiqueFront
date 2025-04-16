//Implémenter le JS de ma page

const inputNom = document.getElementById("NomInput");
const inputPreNom = document.getElementById("PrénomInput");
const inputMail = document.getElementById("EmailInput");
const inputPassword = document.getElementById("PasswordInput");
const inputValidationPassword = document.getElementById("ValidatePasswordInput");
const btnValidation = document.getElementById("btn-validation-inscription");
const formInscription = document.getElementById("FormulaireInscription");

inputValidationPassword.addEventListener("keyup", validateForm); // on ajoute un écouteur d'événement sur l'input validation password

btnValidation.addEventListener("click", InscrireUtilisateur); // on ajoute un écouteur d'événement sur le bouton valider

// Fonction qui va permettre de valider le formulaire
function validateForm() {
    const nomOk = validateRequired(inputNom);
    const prenomOk = validateRequired(inputPreNom);
    const mailOk = validateMail(inputMail);
    const passwordOk = validatePassword(inputPassword);
    const passwordComfirmOk = validateConfirmationPassword(inputPassword, inputValidationPassword);

    if (nomOk && prenomOk && mailOk && passwordOk && passwordComfirmOk) {
        btnValidation.disabled = false;
    } else {
        btnValidation.disabled = true;
    }
}

function validateMail(input) {
    // Définir mon regex pour l'email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const mailUser = input.value;
    if (mailUser.match(emailRegex)) {
        input.classList.add("is-valid");
        input.classList.remove("is-invalid");
        return true;
    } else {
        input.classList.remove("is-valid");
        input.classList.add("is-invalid");
        return false;
    }
}

function validatePassword(input) {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_])[A-Za-z\d\W_]{8,}$/;
    const passwordUser = input.value;
    if (passwordUser.match(passwordRegex)) {
        input.classList.add("is-valid");
        input.classList.remove("is-invalid");
        return true;
    } else {
        input.classList.remove("is-valid");
        input.classList.add("is-invalid");
        return false;
    }
}

function validateConfirmationPassword(inputPwd, inputConfirmPwd) {
    if (inputPwd.value === inputConfirmPwd.value) {
        inputConfirmPwd.classList.add("is-valid");
        inputConfirmPwd.classList.remove("is-invalid");
        return true;
    } else {
        inputConfirmPwd.classList.add("is-invalid");
        inputConfirmPwd.classList.remove("is-valid");
        return false;
    }
}

function validateRequired(input) {
    if (input.value !== '') {
        input.classList.add("is-valid");
        input.classList.remove("is-invalid");
        return true;
    } else {
        input.classList.remove("is-valid");
        input.classList.add("is-invalid");
        return false;
    }
}

async function InscrireUtilisateur(event) {
    event.preventDefault(); // Empêcher la soumission par défaut
    
    try {
        btnValidation.disabled = true;
        
        // Vérifier si le serveur est accessible
        try {
            const serverCheck = await fetch("http://localhost:8000/health", {
                method: "GET",
                mode: 'cors'
            });
            if (!serverCheck.ok) {
                throw new Error("Le serveur n'est pas accessible");
            } else {
                console.log("Le serveur est accessible !"); // Ajout d'un message de succès
            }
        } catch (error) {
            throw new Error("Impossible de se connecter au serveur.");
        }

        const dataform = new FormData(formInscription);
        
        const userData = {
            firstName: dataform.get("nom"),
            lastName: dataform.get("prenom"),
            email: dataform.get("email"),
            password: dataform.get("mdp")
        };

        const response = await fetch("http://localhost:8000/api/registration", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify(userData),
            mode: 'cors',
            credentials: 'include'
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || `Erreur HTTP : ${response.status}`);
        }

        const result = await response.json();
        sessionStorage.setItem('inscriptionSuccess', 'true');
        window.location.href = '/login';
        
    } catch (error) {
        handleError(error, formInscription);
    } finally {
        btnValidation.disabled = false;
    }
}

function handleError(error, form) {
    const errorMessage = document.createElement('div');
    errorMessage.className = 'alert alert-danger mt-3';
    
    // Messages d'erreur plus spécifiques
    if (error.message.includes("CONNECTION_REFUSED")) {
        errorMessage.textContent = "Le serveur n'est pas accessible. Veuillez réessayer plus tard.";
    } else {
        errorMessage.textContent = error.message || "Une erreur est survenue lors de l'inscription";
    }
    
    // Supprimer les messages d'erreur précédents
    const existingErrors = form.querySelectorAll('.alert-danger');
    existingErrors.forEach(el => el.remove());
    
    form.insertBefore(errorMessage, form.firstChild);
}

function addFieldValidation(input, validationFn) {
    input.addEventListener('input', () => {
        validationFn(input);
        validateForm();
    });
    
    // Validation au focus out
    input.addEventListener('blur', () => {
        validationFn(input);
        validateForm();
    });
}

// Initialisation des validations
addFieldValidation(inputNom, validateRequired);
addFieldValidation(inputPreNom, validateRequired);
addFieldValidation(inputMail, validateMail);
addFieldValidation(inputPassword, validatePassword);
addFieldValidation(inputValidationPassword, validateConfirmationPassword);
