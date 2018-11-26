/**
 * funcion en cargada en la validacion del registro del usuario, esta función
 * se dispara cuando el boton del registro es pulsado
 */
function validationRegister() {
    const person = objectRegister();
    let repasswd = document.getElementById('passwd-repeat').value.trim();
    if (person.name.length > 0 && person.lastname.length > 0 && person.phone.length > 7
        && person.username.length > 0 && person.passwd > 7 && repasswd.length > 7
        && repasswd === person.passwd && !thereIsAUserName(person.username, 'persons')) {
        if (addItemsToTheArray(person, 'persons') && saveToSessionStorage('person', person)) {
            location.href = './dashboard.html';
        }
    }
}

/**
 * funcion que valida el login al hacer el evento del boton
 */
function validationLogin() {
    const person = objectLogin();
    const existUser = login(person);
    let alertPasswd = document.getElementById('alert-passwd');
    if (person.username.length > 0 && person.passwd.length > 0) {
        if (existUser) {
            if (saveToSessionStorage('person', existUser)) {
                location.href = './dashboard.html';
            }
        } else {
            setAlertError(alertPasswd, 'El usuario o la contraseña son invalidos.');
        }
    }
}

/**
 * funcion que valida que los campos del rides esten llenos
 */
function validationRide() {
    const ride = objectRide();
    if (ride.nameRide.length > 0 && ride.start.length > 0 &&
        ride.end.length > 0 && ride.description.length > 0 &&
        ride.startTime.length > 0 && ride.endTime.length > 0 &&
        ride.days.length > 0) {
        if (addItemsToTheArray(ride, 'rides')) {
            setAlertWindow('¡Se guardado con exito!');
            resetForm('form');
            clearAlertRide();
        }
    }
}

/**
 * funcion que limpia los campos de las alertas del ride
 */
function clearAlertRide() {
    document.getElementById('alert-nameRide').innerHTML = '';
    document.getElementById('alert-start').innerHTML = '';
    document.getElementById('alert-end').innerHTML = '';
    document.getElementById('alert-description').innerHTML = '';
    document.getElementById('alert-startTime').innerHTML = '';
    document.getElementById('alert-endTime').innerHTML = '';
    document.getElementById('alert-day').innerHTML = '';
}

/**
 * funcion que limpia los campos del formulario
 * @param {} form id del formulario que se desea limpiar
 */
function resetForm(form) {
    document.getElementById(form).reset();
}

/**
 * funcion que obtiene si el usuario y la contraseña existen en localstorage
 * @param {*} object objecto de la persona que se esta registrando en login
 */
function login(object) {
    if (persons) {
        return persons.find(person => object.username === person.username && object.passwd === person.passwd);
    }
    return false;
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
 * funcion encargada de mostrar los datos del usuario en pantalla
 */
function loadDataUser() {
    const person = getFromSessionStorage('person');
    let viewName = document.getElementById('name-nav');
    let viewUser = document.getElementById('username-nav');
    let viewNameOut = document.getElementById('name-nav-out');
    if (person) {
        viewName.innerHTML = person.name + ' ' + person.lastname + '<br>';
        viewUser.innerHTML = 'Usuario: ' + person.username;
        viewNameOut.innerHTML = 'Bienvenido ' + person.username;
    }
}

/**
 * funcion que cierra la session del usuario
 */
function closeSession() {
    if (removeSessionStorage('person')) {
        location.href = './index.html';
    }
}