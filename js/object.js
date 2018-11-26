
/**
 * funcion que obtiene los datos del usuario y los pasa a
 * un objecto
 */
function objectRegister() {
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
 * funcion encargada de extrar la nombre de usuario y la contraseña de los campos del formulario
 */
function objectLogin() {
    let username = document.getElementById('user').value.trim();
    let passwd = document.getElementById('password').value.trim();

    let person = {
        username,
        passwd
    }

    return person;
}

/**
 * funcion que retorna un objeto de ride
 */
function objectRide() {
    let idUser = getIdUser(getFromSessionStorage('person').username);
    let nameRide = document.getElementById('ride-name').value.toLowerCase().toLowerCase().trim();
    let start = document.getElementById('start').value.toLowerCase().trim();
    let end = document.getElementById('end').value.trim();
    let description = document.getElementById('description').value.trim();
    let startTime = document.getElementById('start-time').value.trim();
    let endTime = document.getElementById('end-time').value.trim();
    let days = getCheckbox();

    let ride = {
        idUser,
        nameRide,
        start,
        end,
        description,
        startTime,
        endTime,
        days
    }
    
    return ride;
}

/**
 * funcion que retorna el id del usuario segun la posicion donde se encuentre
 * @param {*} username nombre del usuario a buscar
 */
function getIdUser(username) {
    let id = 0;
    for (let index = 0; index < persons.length; index++) {
        if (persons[index].username === username) {
            id = index;
            break;
        }
    }
    return id;
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