/**
 * funcion que valida que solo se pueda digita numeros en los campas de texto asignados
 */
function validationOnlyNumber() {
    if ((event.keyCode < 48) || (event.keyCode > 57)) {
        event.returnValue = false;
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

/**
 * funcion que divide las paralabras
 * @param {*} text texto a separar
 * @param {*} split separador por el cual quiere que separe la funcion
 */
function split(text, split) {
    return text.split(split);
}

function clearForm() {
    document.getElementById('form').reset();
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
 * funcion que valida si el nombre de usuario y la contraseña existe
 * @param {*} userName nombre de usuario a consultar en el localstorage
 * @param {*} passwd contraseña del usuario a consultar en el localstorage
 */
function thereIsAUserNameAndPasswd(userName, passwd) {
    const persons = getFromLocalStorage('persons');
    if (persons) {
        return persons.find(person => userName === person.userName && passwd === person.passwd);
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
 * funcion que recupera al usuario que se encuentra en la lista de persons
 * @param {*} id ID del usuario
 */
function getPersonById(id) {
    const persons = getFromLocalStorage('persons');
    let person = null;
    persons.forEach((element, index) => {
        if (index === (id - 1)) {
            person = element;
        }
    });
    return person;
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
 * funcion que hace el login a la aplicacion
 */
function loginUser() {
    const person = objectLogin();
    if (person.userName.length > 0 && person.passwd.length > 0) {
        if (!thereIsAUserNameAndPasswd(person.userName, person.passwd)) {
            let alertPasswd = document.getElementById('alert-passwdLogin');
            setAlertError(alertPasswd, 'El nombre de usuario o la contraseña son incorrectos.');
        } else {
            saveToSessionStorage('person', getIdUser(person.userName));
            location.href = './dashboard.html';
        }
    }
}

/**
 * funcion que actualiza los datos de la persona
 * @param {*} id ID del usuario que se encuentra en posicion especifica en el arreglo persons
 * @param {*} setting Objecto que captura los datos del formulario configuraciones
 */
function updatePerson(id, setting) {
    let persons = getFromLocalStorage('persons');
    let result = false;
    if (persons) {
        persons.forEach((element, index) => {
            if (index === (id - 1)) {
                let fullName = split(setting.fullName, ' ');
                element.name = fullName[0];
                element.lastName = fullName[1];
                element.speed = setting.speed;
                element.aboutme = setting.aboutme;
                if (removeKeyLocalstorage('persons')) {
                    result = saveToLocalStorage('persons', persons);
                }
            }
        });
    }
    return result;
}

/**
 * funcion que actualiza los datos del usuario en el formulario persona
 */
function settingUser() {
    const setting = objectSetting();
    if (setting.fullName.length > 0 && setting.speed.length > 0
        && setting.aboutme.length > 0) {
        let id = getFromSessionStorage('person').id;
        if (updatePerson(id, setting)) {
            setAlertWindow('¡Se ha hecho los cambios exitosamente!');
            setAlertError(document.getElementById('alert-fullname'), '');
            setAlertError(document.getElementById('alert-speed'), '');
            setAlertError(document.getElementById('alert-aboutme'), '');
        }
    }
}

/**
 * funcion que carga las informació nesesario del usuario en el index
 */
function loadDataToUser() {
    const persons = getFromLocalStorage('persons');
    const person = getFromSessionStorage('person');
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
 * funcion que carga las configuraciones del usuario
 */
function loadSetting() {
    const persons = getFromLocalStorage('persons');
    const person = getFromSessionStorage('person');
    if (persons && person) {
        persons.forEach((element, index) => {
            if (index === (person.id - 1)) {
                $('#full-name').val(element.name + ' ' + element.lastName);
                $('#speed').val(element.speed);
                $('#about-me').val(element.aboutme);
            }
        });
    }
}

/**
 * funcion que crea un ride 
 */
function createRide() {
    const ride = objectRide();
    let alertDays = document.getElementById('alert-day');
    if (ride.rideName.length > 0 && ride.start.length > 0
        && ride.end.length > 0 && ride.description.length > 0
        && ride.startTime.length > 0 && ride.endTime.length > 0) {
        console.log(ride.days);
        if (ride.days.length === 0) {
            setAlertError(alertDays, 'Debes seleccionar los día de planeas hacer tu viaje.');
        } else {
            ride.idPerson = getFromSessionStorage('person').id;
            ride.idRide = getFromLocalStorage('rides');
            ride.idRide = ride.idRide != null ? (ride.idRide.length + 1) : 1;
            if (addItemsToTheArray('rides', ride)) {
                setAlertError(document.getElementById('alert-rideName'), '');
                setAlertError(document.getElementById('alert-start'), '');
                setAlertError(document.getElementById('alert-end'), '');
                setAlertError(document.getElementById('alert-description'), '');
                setAlertError(document.getElementById('alert-startTime'), '');
                setAlertError(document.getElementById('alert-endTime'), '');
                clearForm();
                setAlertWindow('¡Se ha creado tu ride exitosamente!');
                const rides = getFromLocalStorage('rides');
                renderTable('rides', rides);
            }
        }
    }
}

/**
 * funcion que renderiza la tabla con los datos
 * @param {*} tableName nombre de la tabla
 * @param {*} tableData informacion que se insertara en la tabla
 */
function renderTable(tableName, tableData) {
    let IdPerson = getFromSessionStorage('person');
    if (tableData && IdPerson) {
        let person = getPersonById(IdPerson.id);
        let table = $(`#${tableName}_table`);
        let rows = "";
        tableData.forEach(element => {
            if (element.idPerson === IdPerson.id) {
                let row = `<tr><td>${person.name + ' ' + person.lastName}</td><td>${element.start}</td><td>${element.end}</td><td>${element.startTime}</td><td>${element.endTime}</td>`;
                row += `<td> <a href="#modal1" class="btn waves-effect yellow darken-4 btn-long modal-trigger" onclick="editRide(this)" data-id="${element.idRide}" data-entity="${tableName}"><i class="material-icons left">edit</i>Edutar</a></td>
                    <td><a class="btn waves-effect red btn-long" onclick="deleteRide(this);" data-id="${element.idRide}" data-entity="${tableName}"><i class="material-icons left">delete</i>Eliminar</a></td>`;
                rows += row + '</tr>';
            }
        });
        if (rows === "") {
            rows +=    `<tr><td colspan="7" class="center"><h3>No hay rides que mostrar...</h3></td></tr>`;
        }
        table.html(rows);
    }
}

function loadDataRideInform(entity, idRide) {
    const data = getFromLocalStorage(entity);
    data.forEach((element, index) => {
        if (index === (idRide - 1)) {
            $('#ride-name').val(element.rideName);
            $('#start').val(element.start);
            $('#end').val(element.end);
            $('#description').val(element.description);
            $('#start-time').val(element.startTime);
            $('#end-time').val(element.endTime);
        }
    });
}

function editRide(element) {
    const object = $(element).data();

}

function deleteRide(element) {

}

/**
 * funcion que carga la tabla
 * @param {*} tableName nombre de la tabla
 */
function loadTableData(tableName) {
    const rides = getFromLocalStorage('rides');
    renderTable(tableName, rides);
}