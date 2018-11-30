/**
 * funcion que valida que solo se pueda digita numeros en los campas de texto asignados
 */
function validationOnlyNumber() {
    if ((event.keyCode < 48) || (event.keyCode > 57)) {
        event.returnValue = false;
    }
}

/**
 * funcion que valida si el nombre de usuario ya existe
 * @param {*} userName nombre del usuario a consultar en el localstorage 
 */
function thereIsAUserName(userName) {
    const persons = getFromLocalStorage('persons');
    if (persons) {
        return persons.find(person => userName === person.userName);
    }
    return false;
}

/**
 * funcion que obtiene el id del usuario
 * @param {*} person objecto persona donde se encuentran los usuarios registrados
 * @param {*} userName nombre de usuario por el cual es unico, hace que la busqueda 
 * sea más efectiva y sertera
 */
function getIdUser(userName) {
    const persons = getFromLocalStorage('persons');
    var id = 0;
    if (persons) {
        persons.forEach((element, index) => {
            if (element.userName === userName) {
                id = index + 1;
            }
        });
    }
    return { id };
}

/**
 * funcion que obtiene el id los checkbox seleccionados en el formulario 
 */
function getCheckbox() {
    let days = [];
    $("input[type=checkbox]:checked").each(function () {
        days.push($(this).prop("id"));
    });
    return days;
}

/**
 * funcion que registra al usuario desde el formulario
 */
function registerUser() {
    const person = objectRegister();
    let repeatPasswd = $.trim($('#passwd-repeat').val());
    if (person.name.length > 0 && person.lastName.length > 0 && person.phone.length > 7
        && person.userName.length > 0 && person.passwd === repeatPasswd
        && !thereIsAUserName(person.userName) && addItemsToTheArray('persons', person)
        && saveToSessionStorage('person', getIdUser(person.userName))) {
        location.href = './dashboard.html';
    }
}

/**
 * funcion que carga las informació nesesario del usuario en el index
 */
function loadDataToUser() {
    const persons = getFromLocalStorage('persons');
    let person = getFromSessionStorage('person');
    if (persons && person) {
        let nameNav = document.getElementById('name-nav');
        let userNameNav = document.getElementById('username-nav');
        let nameOut = document.getElementById('name-nav-out');
        persons.forEach((element, index) => {
            if (index === (person.id - 1)) {
                nameNav.innerHTML = element.name + ' ' + element.lastName + '</br>';
                userNameNav.innerHTML = 'Usuario: ' + element.userName;
                nameOut.innerHTML = 'Bienvenido ' + element.userName;
            }
        });
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
