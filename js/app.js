/**
 * funcion que obtiene los datos del usuario y los pasa a 
 * un objecto
 */
function objectUser() {
    var name = document.getElementById('name').value.trim();
    var lastname = document.getElementById('lastname').value.trim();
    var phone = document.getElementById('phone').value.trim();
    var username = document.getElementById('username').value.toLowerCase().trim();
    var passwd = document.getElementById('passwd').value.trim();

    var person = {
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
    var person = objectUser();
    var repasswd = document.getElementById('passwd-repeat').value.trim();
    var alertName = document.getElementById('alert-name');
    var alertLastName = document.getElementById('alert-lastname');
    var alertPhone = document.getElementById('alert-phone');
    var alertUserName = document.getElementById('alert-username');
    var alertPasswd = document.getElementById('alert-passwd');
    var alertRePasswd = document.getElementById('alert-repasswd');


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
        // if (thereIsAUserName(person.username, 'person')) {
        //     setAlertError(alertUserName, 'Este nombre de usuario ya existe');
        // } else {
            setAlertSuccess(alertUserName);
        //}
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

function validationRegisterUser() {
    var person = objectUser();
    var repasswd = document.getElementById('passwd-repeat').value.trim();
    if (person.name.length > 0 && person.lastname.length > 0 && person.phone.length > 7
        && person.username.length > 0 && person.passwd > 7 && repasswd.length > 7
        && repasswd === person.passwd) {
        //thereIsAUserName(person.username, 'person')
        sendLocalStorage('person', person);
        location.href = './dashboard.html'
    } else {
        console.log('falta datos por completar');
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
 * funcion en caragada ingresar los datos al localstrage verificando primero si existe la llave del localstorage
 * @param {*} nameObject nombre de la llave que se usara para meter los nuevos datos al localstorage
 * @param {*} keyNew nuevos datos que se agregaran al localstorage
 */
function sendLocalStorage(nameObject, keyNew) {
    var temp;
    if (getFromLocalStorage(nameObject) === null) {
        temp = [keyNew];
    } else {
        temp = getFromLocalStorage(nameObject);
        temp.push(keyNew);
    }
    if (saveToLocalStorage(nameObject, temp)) {
        console.log('Se ha registrado con exito');
    }
}

/**
 * funcion que se encarga de validar si el nombre de usuario existe
 * @param {*} username nombre de usuario
 * @param {*} key nombre del llave del localstorage
 */
function thereIsAUserName(username, key) {
    var person = getFromLocalStorage(key);
    person.forEach(element => {
        return element.username === username;
    });
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

