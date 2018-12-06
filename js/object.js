/**
 * funcion que obtiene los datos del formulario registro del usuario
 */
function objectRegister() {
    let name = $.trim($('#name').val());
    let lastName = $.trim($('#lastname').val());
    let phone = $.trim($('#phone').val());
    let userName = $.trim($('#username').val());
    let passwd = $.trim($('#passwd').val());
    let speed = $.trim($('#speed').val());
    let aboutme = $.trim($('#about-me').val());

    const person = {
        name,
        lastName,
        phone,
        userName,
        passwd,
        speed,
        aboutme
    }

    return person;
}

/**
 * funcion que obtiene los datos del formulario login del usuario
 */
function objectLogin() {
    let userName = $.trim($('#usernameLogin').val());
    let passwd = $.trim($('#passwdLogin').val());

    const person = {
        userName,
        passwd
    }

    return person;
}

/**
 * funcion que obtiene los datos del formulario de configuciones del usuario
 */
function objectSetting() {
    let fullName = $.trim($('#full-name').val());
    let speed = $.trim($('#speed').val());
    let aboutme = $.trim($('#about-me').val());

    const setting = {
        fullName,
        speed,
        aboutme
    }

    return setting;
}

/**
 * funcion que obtiene los datos del formulario de rides
 */
function objectRide() {
    let idRide = 0;
    let idPerson = 0;
    let rideName = $.trim($('#ride-name').val());
    let start = $.trim($('#start').val());
    let end = $.trim($('#end').val());
    let description = $.trim($('#description').val());
    let startTime = $.trim($('#start-time').val());
    let endTime = $.trim($('#end-time').val());
    let days = getCheckbox();

    const ride = {
        idRide,
        idPerson,
        rideName,
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
 * funcion que carga los checkbox seleccionados por el usuario
 * @param {*} days arreglo de dias seleccionados
 */
function loadCheckbox(days) {      
    $(`#monday`).attr("checked", false);        
    $(`#tuesday`).attr("checked", false);       
    $(`#wednesday`).attr("checked", false);       
    $(`#thursday`).attr("checked", false);       
    $(`#friday`).attr("checked", false);       
    $(`#saturday`).attr("checked", false);     
    $(`#sunday`).attr("checked", false);
    days.forEach((element, index) => {  
        $(`#${days[index]}`).attr("checked", true);
    });
}