/**
 * funcion que obtiene los datos del usuario y los pasa a 
 * un objecto
 */
function objectUser() {
    var name = document.getElementById('name').value;
    var lastname = document.getElementById('lastname').value;
    var phone = document.getElementById('phone').value;
    var username = document.getElementById('username').value;
    var passwd = document.getElementById('passwd').value;

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
 * funcion que valida los datos del usuario
 */
function validationRegisterUser() {
    var person = objectUser();
    var repasswd = document.getElementById('passwd-repeat').value;

    var successName = document.getElementById('success-name');
    var successLastname = document.getElementById('success-lastname');
    var successPhone = document.getElementById('success-phone');
    var successUsername = document.getElementById('success-username');
    var successpasswd = document.getElementById('success-passwd');

    var errorName = document.getElementById('error-name');
    var errorLastname = document.getElementById('error-lastname');
    var errorPhone = document.getElementById('error-phone');
    var errorUsername = document.getElementById('error-username');

    if (person.name.length === 0) {
        setError(errorName, 'Escribe tu nombre.', successName);
    } else {
        setSeccess(successName, errorName);
    }
    if (person.lastname.length === 0) {
        setError(errorLastname, 'Escribe tus apellidos.', successLastname);
    }else {
        setSeccess(successLastname, errorLastname);
    }
    if (person.phone.length === 0) {
        setError(errorPhone, 'Digita tu número de telefono.', successPhone);
    }else {
        setSeccess(successPhone, errorPhone);
    }
    if (person.username.length === 0) {
        setError(errorUsername, 'Escribe tu nombre de usuario.', successUsername);
    }else {
        setSeccess(successUsername, errorUsername);
    }
    if (validationPasswd(person.passwd, repasswd, successpasswd)) {
        setSeccess(successpasswd, errorPasswd);
    }
}

/**
 * funcion que valida la contraseña del usuario
 * @param {*} passwd contraseña digitada por el usuario
 * @param {*} rePasswd segunda contraseña digitada por el usuario
 * @param {*} successpasswd entrada para asignar innnerHTML
 */
function validationPasswd(passwd, rePasswd, successpasswd) {
    var errorRepasswd = document.getElementById('error-repasswd');
    if (passwd.length === 0) {
        setError(errorRepasswd, 'Escribe tu contraseña.', successpasswd);
    } else if (passwd.length < 8) {
        setError(errorRepasswd, 'Esta contraseña no cumple con 8 caracteres minimos', successpasswd);
    } else if (rePasswd.length < 8) {
        setError(errorRepasswd, 'Esta contraseña no cumple con 8 caracteres minimos', successpasswd);
    }else if (passwd != rePasswd) {
        setError(errorRepasswd, 'Las contraceñas no coinciden', successpasswd);
    }
    return false;
}

/**
 * funcion que da el mensaje al usuario que las validaciones esten correctas
 * @param {*} success entrada para asignar innnerHTML 
 */
function setSeccess(success, error) {
    success.innerHTML = '<i class="tiny material-icons green-text">done</i> Correcto';
    error.setAttribute('style', 'display:none;');
    success.setAttribute('style', 'display:block;');
}

/**
 * funcion que da el mensaje al usuario que los datos no estan bien digitados
 * @param {*} error entrada para asignar innnerHTML 
 * @param {*} message mensaje del error al usuario
 */
function setError(error, message, success) {
    error.innerHTML = message;
    success.setAttribute('style', 'display:none;');
    error.setAttribute('style', 'display:block;');
}

/**
 * funcion que dispara los eventos de los botones
 */
function bindEvents() {
    document.getElementById('btn_register').addEventListener('click', validationRegisterUser);
}

bindEvents();

