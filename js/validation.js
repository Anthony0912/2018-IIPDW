/**
 * funcion que valida si lo campos del registro estan competados
 */
function validationRegister() {
    const person = objectRegister();

    let repeatPasswd = $.trim($('#passwd-repeat').val());

    let alertName = document.getElementById('alert-name');
    let alertLastName = document.getElementById('alert-lastname');
    let alertPhone = document.getElementById('alert-phone');
    let alertUserName = document.getElementById('alert-username');
    let alertPasswd = document.getElementById('alert-passwd');
    let alertRepeatPasswd = document.getElementById('alert-repeatpasswd');

    if (person.name.length > 0) {
        setAlertSuccess(alertName);
    } else {
        setAlertError(alertName);
    }
    if (person.lastName.length > 0) {
        setAlertSuccess(alertLastName);
    } else {
        setAlertError(alertLastName);
    }
    if (person.phone.length > 7) {
        setAlertSuccess(alertPhone);
    } else {
        setAlertError(alertPhone);
    }
    if (thereIsAUserName(person.userName)) {
        setAlertError(alertUserName, 'Este nombre de usuario ya existe');
    } else if (!person.userName.length > 0) {
        setAlertError(alertUserName);
    } else {
        setAlertSuccess(alertUserName);
    }
    if (!person.passwd > 0) {
        setAlertError(alertPasswd);
    } else if (person.passwd.length < 8) {
        setAlertError(alertPasswd, 'Tu contraseña debe tener más de 8 caracteres.');
    } else {
        setAlertSuccess(alertPasswd);
    }
    if (!repeatPasswd > 0) {
        setAlertError(alertRepeatPasswd);
    } else if (repeatPasswd != person.passwd) {
        setAlertError(alertRepeatPasswd, 'Tu contraseña no coincide.');
    } else {
        setAlertSuccess(alertRepeatPasswd);
    }
}

/**
 * funcion que dispara las alertas al usuario cuando esta iniciando session
*/
function validationLogin() {
    const person = objectLogin();

    let alertUserName = document.getElementById('alert-usernameLogin');
    let alertPasswd = document.getElementById('alert-passwdLogin');

    if (person.userName.length > 0) {
        setAlertError(alertUserName, '');
    } else {
        setAlertError(alertUserName);
    }
    if (person.passwd.length > 0) {
        setAlertError(alertPasswd, '');
    } else {
        setAlertError(alertPasswd);
    }
}

/**
 * funcion que dispara la alertas al usuario cuando no estan bien digitados los datos en 
 * el formulario de configuraciones
 */
function validationSetting() {
    const setting = objectSetting();

    let alertFullName = document.getElementById('alert-fullname');
    let alertSpeed = document.getElementById('alert-speed');
    let alertAboutme = document.getElementById('alert-aboutme');

    if (setting.fullName.length > 0) {
        setAlertSuccess(alertFullName);
    } else {
        setAlertError(alertFullName);
    }
    if (setting.speed.length > 0) {
        setAlertSuccess(alertSpeed);
    } else {
        setAlertError(alertSpeed);
    }
    if (setting.aboutme.length > 0) {
        setAlertSuccess(alertAboutme);
    } else {
        setAlertError(alertAboutme);
    }
}

function validationRide() {
    const ride = objectRide();
    let alertRideName = document.getElementById('alert-rideName');
    let alertStart = document.getElementById('alert-start');
    let alertEnd = document.getElementById('alert-end');
    let alertDescription = document.getElementById('alert-description');
    let alertStartTime = document.getElementById('alert-startTime');
    let alertEndTime = document.getElementById('alert-endTime');

    if (ride.rideName.length > 0) {
        setAlertSuccess(alertRideName);
    }else {
        setAlertError(alertRideName);
    }
    if (ride.start.length > 0) {
        setAlertSuccess(alertStart);
    }else{
        setAlertError(alertStart, 'Debes digitar el lugar de salida.');
    }
    if (ride.end.length > 0) {
        setAlertSuccess(alertEnd);
    }else {
        setAlertError(alertEnd, 'Deber digitar el lugar de llegada.');
    }
    if (ride.description.length > 0) {
        setAlertSuccess(alertDescription);
    }else {
        setAlertError(alertDescription);
    }
    if (ride.startTime.length > 0) {
        setAlertSuccess(alertStartTime);
    }else{
        setAlertError(alertStartTime, 'Debes digitar la hora de salida.');
    }
    if (ride.endTime.length > 0) {
        setAlertSuccess(alertEndTime);
    }else{
        setAlertError(alertEndTime, 'Debes digitar la hora estimada de llegada.');
    }
}