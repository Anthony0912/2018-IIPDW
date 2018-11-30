/**
 * funcion que valida si lo campos del registro estan competados
 */
function validationRegister() {
    const person = objectRegister();
    let repeatPasswd = $('#passwd-repeat').val();

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