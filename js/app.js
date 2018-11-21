/**
 * constantes para extraer los datos al localstroge
 */
const persons = getFromLocalStorage('persons');

/**
 * funcion que obtiene los datos del usuario y los pasa a 
 * un objecto
 */
function objectUser() {
    let name = document.getElementById('name').value.trim();
    let lastname = document.getElementById('lastname').value.trim();
    let phone = document.getElementById('phone').value.trim();
    let username = document.getElementById('username').value.toLowerCase().trim();
    let passwd = document.getElementById('passwd').value.trim();
    
    let person = {
        name,
        lastname,
        phone,
        username,
        passwd
    }
    
    return person;
}

/**
 * funcion que se encarga de alertar al usuario sobre sobre los campos que faltan por
 * llenar
 */
function alertTheUser() {
    const person = objectUser();
    let repasswd = document.getElementById('passwd-repeat').value.trim();
    let alertName = document.getElementById('alert-name');
    let alertLastName = document.getElementById('alert-lastname');
    let alertPhone = document.getElementById('alert-phone');
    let alertUserName = document.getElementById('alert-username');
    let alertPasswd = document.getElementById('alert-passwd');
    let alertRePasswd = document.getElementById('alert-repasswd');


    if (person.name.length > 0) {
        setAlertSuccess(alertName);
    } else {
        setAlertError(alertName);
    }

    if (person.lastname.length > 0) {
        setAlertSuccess(alertLastName);
    } else {
        setAlertError(alertLastName);
    }

    if (person.phone.length > 7) {
        setAlertSuccess(alertPhone);
    } else {
        setAlertError(alertPhone);
    }

    if (person.username.length > 0) {
        if (thereIsAUserName(person.username, 'persons')) {
            setAlertError(alertUserName, 'Este nombre de usuario ya existe');
        } else {
            setAlertSuccess(alertUserName);
        }
    } else {
        setAlertError(alertUserName);
    }

    if (person.passwd.length > 0) {
        if (person.passwd.length < 8) {
            setAlertError(alertPasswd, 'Tu contraseña debe tener más de 8 caracteres.');
        } else {
            setAlertSuccess(alertPasswd);
        }
    } else {
        setAlertError(alertPasswd);
    }

    if (repasswd.length > 0) {
        if (repasswd != person.passwd) {
            setAlertError(alertRePasswd, 'No coincide tu contraseña.');
        } else {
            setAlertSuccess(alertRePasswd);
        }
    } else {
        setAlertError(alertRePasswd);
    }
}

/**
 * funcion en cargada en la validacion del registro del usuario, esta función 
 * se dispara cuando el boton del registro es pulsado
 */
function validationRegisterUser() {
    const person = objectUser();
    let repasswd = document.getElementById('passwd-repeat').value.trim();
    if (person.name.length > 0 && person.lastname.length > 0 && person.phone.length > 7
        && person.username.length > 0 && person.passwd > 7 && repasswd.length > 7
        && repasswd === person.passwd && !thereIsAUserName(person.username, 'persons')) {
            if (addItemsToTheArray(person, 'persons')) {
                location.href = './dashboard.html';
            }else{
                console.log('faltan datos por completar dentro');
            }
    } else {
        console.log('falta datos por completar afuera');
    }
}

/**
 * funcion que valida que solo se pueda digita numeros en los campas de texto asignados
 */
function validationOnlyNumber() {
    if ((event.keyCode < 48) || (event.keyCode > 57)) {
        event.returnValue = false;
    }
}

/**
 * funcion que se encarga de validar si el nombre de usuario existe
 * @param {*} username nombre de usuario
 * @param {*} key nombre del llave del localstorage
 */
function thereIsAUserName(username) {
    if (persons) {
        return persons.find(person => person.username === username);
    }
    return false;
}

/**
 * funcion que dispara la alerta, verifica que los campos esten correctos
 * @param {*} alert elemento id que dispara la alerta
 */
function setAlertSuccess(alert) {
    alert.innerHTML = '<i class="tiny material-icons green-text">done</i> Correcto';
    alert.setAttribute('style', 'color:green;');
}

/**
 * funcion que dispara la alertar, verifica que los errores del usuario
 * @param {*} alert elemento id que dispara la alerta
 * @param {*} messager texto de alerta
 */
function setAlertError(alert, messager = 'Debes llenar este campo.') {
    alert.innerHTML = messager;
    alert.setAttribute('style', 'color:red;');
}

function bindEventsKeyPressInputText() {
    document.getElementById('phone').addEventListener('keypress', validationOnlyNumber);
}

/**
 * funcion de dispara el eventos de keyup a los campos de texto 
 */
function bindEventsKeyUpInputText() {
    document.getElementById('name').addEventListener('keyup', alertTheUser);
    document.getElementById('lastname').addEventListener('keyup', alertTheUser);
    document.getElementById('phone').addEventListener('keyup', alertTheUser);
    document.getElementById('username').addEventListener('keyup', alertTheUser);
    document.getElementById('passwd').addEventListener('keyup', alertTheUser);
    document.getElementById('passwd-repeat').addEventListener('keyup', alertTheUser);
}

/**
 * funcion que dispara los eventos de los botones
 */
function bindEventsButton() {
    document.getElementById('btn_register').addEventListener('click', validationRegisterUser);
}

bindEventsButton();
bindEventsKeyUpInputText();
bindEventsKeyPressInputText();

