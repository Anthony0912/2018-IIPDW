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

function setAlertWindow(text) {
    M.toast({html: text});
}

/**
 * funcion que se encarga de alertar al usuario sobre sobre los campos que faltan por
 * llenar
 */
function alertRegister() {
    const person = objectRegister();
    let repasswd = document.getElementById('passwd-repeat').value.trim();
    let alertName = document.getElementById('alert-name');
    let alertLastName = document.getElementById('alert-lastname');
    let alertPhone = document.getElementById('alert-phone');
    let alertUserName = document.getElementById('alert-username');
    let alertPasswd = document.getElementById('alert-passwd');
    let alertRePasswd = document.getElementById('alert-repasswd');


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
        if (thereIsAUserName(person.username, 'persons')) {
            setAlertError(alertUserName, 'Este nombre de usuario ya existe');
        } else {
            setAlertSuccess(alertUserName);
        }
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

/**
 * funcion que se encarga de alertar al usuario sobre sobre los campos que faltan por
 * llenar
 */
function alertLogin() {
    let person = objectLogin();
    let alertUserName = document.getElementById('alert-username');
    let alertPasswd = document.getElementById('alert-passwd');

    if (!person.username.length > 0) {
        setAlertError(alertUserName);
    } else {
        setAlertError(alertUserName, null);

    }
    if (!person.passwd.length > 0) {
        setAlertError(alertPasswd);
    } else {
        setAlertError(alertPasswd, null);
    }
}

/**
 * funcion que dispara las alertas de los campos del formulario de los rides que no han sido completados
 */
function alertRide() {
    let ride = objectRide();
    let alerNameRide = document.getElementById('alert-nameRide');
    let alertStart = document.getElementById('alert-start');
    let alertEnd = document.getElementById('alert-end');
    let alertDescription = document.getElementById('alert-description');
    let alertStartTime = document.getElementById('alert-startTime');
    let alertEndTime = document.getElementById('alert-endTime');
    let alertDay = document.getElementById('alert-day');

    if (ride.nameRide.length > 0) {
        setAlertSuccess(alerNameRide);
    } else {
        setAlertError(alerNameRide);
    }
    if (ride.start.length > 0) {
        setAlertSuccess(alertStart);
    } else {
        setAlertError(alertStart);
    }
    if (ride.end.length > 0) {
        setAlertSuccess(alertEnd);
    } else {
        setAlertError(alertEnd);
    }
    if (ride.description.length > 0) {
        setAlertSuccess(alertDescription);
    } else {
        setAlertError(alertDescription);
    }
    if (ride.startTime.length > 0) {
        setAlertSuccess(alertStartTime);
    } else {
        setAlertError(alertStartTime, 'Digita la hora de salida.');
    }
    if (ride.endTime.length > 0) {
        setAlertSuccess(alertEndTime);
    } else {
        setAlertError(alertEndTime, 'Digita la hora de llegada.');
    }
    // if (days.length > 0) {
    //     setAlertError(alertDay, null);
    // }else{
    //     setAlertError(alertDay, 'Debes seleccionar un día de la semana.');
    // }
}