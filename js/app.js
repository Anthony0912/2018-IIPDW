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
    if (removeSessionStorage('ID')) {
        location.href = './login.html';
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

/**
 * funcion que limpia los campos del formulario
 */
function clearForm() {
    document.getElementById('form').reset();
}

/**
 * funcion que obtiene el usuario completo por id
 * @param {*} persons array de personas
 * @param {*} ID id del usuario a buscar
 */
function getPersonByID(ID) {
    const persons = getFromLocalStorage('persons');
    let temp = '';
    persons.forEach((element, index) => {
        if (index == (ID - 1)) {
            temp = element;
        }
    });
    return temp;
}

/**
 * funcion que varifica si existe el nombre usuario
 * @param {*} userName nombre del usuario
 */
function thereIsAUserName(userName) {
    const persons = getFromLocalStorage('persons');
    return persons ? persons.find(element =>
        element.userName.toLowerCase() == userName.toLowerCase()) : false;
}

/**
 * funcion que varifica si el usuario y la contraseña son verdaderas
 * @param {*} userName nombre del usuario
 * @param {*} passwd contraseña del usuario
 */
function thereIsAUserNameAndPasswd(userName, passwd) {
    const persons = getFromLocalStorage('persons');
    return persons ? persons.find(element =>
        element.userName.toLowerCase() == userName.toLowerCase()
        && element.passwd == passwd) : false;
}
/**
 * funcion que extrae el id del usuario
 * @param {*} userName nombre del usuario
 */
function getIdUser(userName) {
    const persons = getFromLocalStorage('persons');
    return persons ? persons.findIndex(element =>
        element.userName.toLowerCase() == userName.toLowerCase()) + 1 : 0;
}

/**
 * funcion que carga las informació nesesario del usuario en el index
 */
function loadDataToUser() {
    const persons = getFromLocalStorage('persons');
    const ID = getFromSessionStorage('ID');
    if (persons && ID) {
        let nameNav = document.getElementById('name-nav');
        let userNameNav = document.getElementById('username-nav');
        let nameOut = document.getElementById('name-nav-out');
        persons.forEach((element, index) => {
            if (index === (ID - 1)) {
                nameNav.innerHTML = element.name + ' ' + element.lastName + '</br>';
                userNameNav.innerHTML = 'Usuario: ' + element.userName;
                nameOut.innerHTML = 'Bienvenido ' + element.userName;
            }
        });
    }
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
        && saveToSessionStorage('ID', getIdUser(person.userName))) {
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
            saveToSessionStorage('ID', getIdUser(person.userName));
            location.href = './dashboard.html';
        }
    }
}

/**
 * funcion que carga las configuraciones del usuario
 */
function loadSetting() {
    const persons = getFromLocalStorage('persons');
    const ID = getFromSessionStorage('ID');
    if (persons && ID) {
        persons.forEach((element, index) => {
            if (index == (ID - 1)) {
                $('#full-name').val(element.name + ' ' + element.lastName);
                $('#speed').val(element.speed);
                $('#about-me').val(element.aboutme);
            }
        });
    }
}

/**
 * funcion que actualiza los datos del usuario en el formulario persona
 */
function settingUser() {
    const setting = objectSetting();
    if (setting.fullName.length > 0 && setting.speed.length > 0
        && setting.aboutme.length > 0) {
        let ID = getFromSessionStorage('ID');
        if (updatePerson(ID, setting)) {
            setAlertWindow('¡Se ha hecho los cambios exitosamente!');
            let alerts = [
                document.getElementById('alert-fullname'),
                document.getElementById('alert-speed'),
                document.getElementById('alert-aboutme')
            ];
            clearAlert(alerts);
        }
    }
}

/**
 * funcion que actualiza los datos de la persona
 * @param {*} id ID del usuario que se encuentra en posicion especifica en el arreglo persons
 * @param {*} setting Objecto que captura los datos del formulario configuraciones
 */
function updatePerson(ID, setting) {
    let persons = getFromLocalStorage('persons');
    let result = false;
    if (persons) {
        persons.forEach((element, index) => {
            if (index == (ID - 1)) {
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
 * funcion que crea un ride 
 */
function createRide() {
    const ride = objectRide();
    let alertDays = document.getElementById('alert-day');
    if (ride.rideName.length > 0 && ride.start.length > 0
        && ride.end.length > 0 && ride.description.length > 0
        && ride.startTime.length > 0 && ride.endTime.length > 0) {
        if (ride.days.length === 0) {
            setAlertError(alertDays, 'Debes seleccionar los día de planeas hacer tu viaje.');
        } else {
            ride.idPerson = getFromSessionStorage('ID');
            ride.idRide = getFromLocalStorage('rides');
            ride.idRide = ride.idRide != null ? (ride.idRide.length + 1) : 1;
            if (addItemsToTheArray('rides', ride)) {
                let alerts = [
                    document.getElementById('alert-rideName'),
                    document.getElementById('alert-start'),
                    document.getElementById('alert-end'),
                    document.getElementById('alert-description'),
                    document.getElementById('alert-startTime'),
                    document.getElementById('alert-endTime'),
                    alertDays
                ];
                clearAlert(alerts);
                clearForm();
                const rides = getFromLocalStorage('rides');
                renderTable('rides', rides);
                setAlertWindow('¡Se ha creado tu ride exitosamente!');
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
    let rows = "";
    let table = $(`#${tableName}_table`);
    let ID = getFromSessionStorage('ID');
    if (tableData && ID) {
        let person = getPersonByID(ID);
        tableData.forEach(element => {
            if (element.idPerson == ID) {
                let row = `<tr><td>${person.name + ' ' + person.lastName}</td>
                <td>${element.start}</td><td>${element.end}</td>
                <td>${element.startTime}</td><td>${element.endTime}</td>`;
                row += `<td> <a href="#modal1" class="btn waves-effect yellow darken-4 btn-long 
                modal-trigger" onclick="loadDataEditRide(this)" data-id="${element.idRide}" 
                data-entity="${tableName}"><i class="material-icons left">edit</i>Editar</a></td>
                    <td><a class="btn waves-effect red btn-long" onclick="deleteRide(this);" 
                    data-id="${element.idRide}" data-entity="${tableName}">
                    <i class="material-icons left">delete</i>Eliminar</a></td>`;
                rows += row + '</tr>';
            }
        });
    }
    if (rows === "") {
        rows += `<tr><td colspan="7" class="center"><h3>No hay rides que mostrar...</h3></td></tr>`;
    }
    table.html(rows);
}

/**
 * funcion que carga los datos para editar los rides
 * @param {*} element elemento que extrae el entity y el id del boton
 */
function loadDataEditRide(element) {
    let object = $(element).data();
    const rides = getFromLocalStorage(object.entity);
    rides.forEach(element => {
        if (element.idRide == object.id) {
            $('#idRide').val(element.idRide);
            $('#ride-name').val(element.rideName);
            $('#start').val(element.start);
            $('#end').val(element.end);
            $('#description').val(element.description);
            $('#start-time').val(element.startTime);
            $('#end-time').val(element.endTime);
            loadCheckbox(element.days);
        }
    });
}

/**
 * funcion que edita los rides
 */
function editRide() {
    let rides = getFromLocalStorage('rides');
    let ride = objectRide();
    let alertDays = document.getElementById('alert-day');
    if (ride.rideName.length > 0 && ride.start.length > 0
        && ride.end.length > 0 && ride.description.length > 0
        && ride.startTime.length > 0 && ride.endTime.length > 0) {
        if (ride.days.length === 0) {
            setAlertError(alertDays, 'Debes seleccionar los día de planeas hacer tu viaje.');
        } else {
            let idRide = $('#idRide').val();
            rides.forEach((element, index) => {
                if (index == (idRide - 1)) {
                    element.rideName = ride.rideName;
                    element.start = ride.start;
                    element.end = ride.end;
                    element.description = ride.description;
                    element.startTime = ride.startTime;
                    element.endTime = ride.endTime;
                    element.days = ride.days;
                }
            });
            removeKeyLocalstorage('rides');
            if (saveToLocalStorage('rides', rides)) {
                let alerts = [
                    document.getElementById('alert-rideName'),
                    document.getElementById('alert-start'),
                    document.getElementById('alert-end'),
                    document.getElementById('alert-description'),
                    document.getElementById('alert-startTime'),
                    document.getElementById('alert-endTime'),
                    document.getElementById('alert-day')
                ];
                clearAlert(alerts);
                loadTableData('rides');
                setAlertWindow('¡Se ha editado tu ride con exito!');
            }
        }
    }
}

/**
 * funcion para eliminar rides
 * @param {*} element elemento que almacena entity y el id del ride
 */
function deleteRide(element) {
    let object = $(element).data();
    let rides = getFromLocalStorage(object.entity);
    rides.forEach((element, index) => {
        if (element.idRide == object.id) {
            rides.splice(index, 1);
        }
    });
    removeKeyLocalstorage('rides');
    saveToLocalStorage('rides', orderList(rides));
    loadTableData('rides');
    setAlertWindow('¡Se ha borrado con exito!');
}

/**
 * funcion que ordena el id de cada ride
 * @param {*} rides array donde almacena todos los rides
 */
function orderList(rides) {
    rides.forEach((element, index) => {
        element.idRide = index + 1;
    });
    return rides;
}

/**
 * funcion que carga la tabla
 * @param {*} tableName nombre de la tabla
 */
function loadTableData(tableName) {
    const rides = getFromLocalStorage('rides');
    renderTable(tableName, rides);
}

/**
 * funcion que renderiza la tabla con los datos
 * @param {*} tableName nombre de la tabla
 * @param {*} tableData informacion que se insertara en la tabla
 */
function renderTableIndex(tableName, tableData, start, end) {
    let rows = "";
    let table = $(`#${tableName}_table`);
    tableData.forEach(element => {
        if (!start.length > 0 && !end.length > 0) {
            rows += loadTableInfo(element, tableName);
        }
        if (element.start.toLowerCase() == start.toLowerCase()
            || element.end.toLowerCase() == end.toLowerCase()) {
            rows += loadTableInfo(element, tableName);
        }
    });
    if (rows === "") {
        rows += `<tr><td colspan="7" class="center"><h3>No hay rides que mostrar...</h3></td></tr>`;
    } else {
    }
    table.html(rows);
}

/**
 * funcion que carga todos datos de la tabla de los rides
 * @param {*} element elemento de la lista de rides
 * @param {*} tableName nombre de la tabla
 */
function loadTableInfo(element, tableName) {
    let person = getPersonByID(element.idPerson);
    let row = `<tr><td>${person.name + ' ' + person.lastName}</td>
        <td>${element.start}</td><td>${element.end}</td>
        <td>${element.startTime}</td><td>${element.endTime}</td>`;
    row += `<td> <a href="#modal1" class="btn btn-long waves-effect success 
        modal-trigger" onclick="loadDataRideIndex(this)" data-id="${element.idRide}" 
        data-entity="${tableName}" style="z-index:0;"><i class="material-icons left yellow-text">start</i>Ver</a></td>`;
    row += '</tr>';
    return row;
}

/**
 * funcion que carga la tabla
 * @param {*} tableName nombre de la tabla
 */
function loadTableDataIndex(tableName, start, end) {
    const rides = getFromLocalStorage('rides');
    renderTableIndex(tableName, rides, start, end);
}

/**
 * funcion que carga el formulario con los datos del ride seleccionado
 * @param {*} element elemento de la lista de rides
 */
function loadDataRideIndex(element) {
    let object = $(element).data();
    const rides = getFromLocalStorage('rides');
    rides.forEach(element => {
        if (element.idRide == object.id) {
            let person = getPersonByID(element.idPerson);
            $('#name').html(person.name + ' ' + person.lastName);
            $('#phone').html(person.phone ? person.phone : 'N/A');
            $('#speed').html(person.speed ? person.speed : 'N/A');
            $('#user').html(person.name);
            $('#aboutme').html(person.aboutme ? person.aboutme : 'N/A');
            $('#ride-name').html(element.rideName);
            $('#start').html(element.start);
            $('#end').html(element.end);
            $('#description').html(element.description);
            $('#start-time').html(element.startTime);
            $('#end-time').html(element.endTime);
            loadCheckbox(element.days);
        }
    });
}

/**
 * funcio que trabaja como una promesa al haber pasado tanto tiempo
 * el recarga la pagina
 */
var promise1 = new Promise(function(resolve, reject) {
    setTimeout(function() {
      resolve('foo');
    }, 9000);
  });