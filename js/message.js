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

/**
 * funcion que muestra un ventana de noctificacion
 * @param {*} text texto de entrada
 */
function setAlertWindow(text) {
    M.toast({ html: text });
}