/**
 * funcion que dispara la alerta, verifica que los campos esten correctos
 * @param {*} alert elemento id que dispara la alerta
 */
function setAlertSuccess(alert) {
    if (alert) {
        alert.innerHTML = '<i class="tiny material-icons green-text">done</i> Correcto';
        alert.setAttribute('style', 'color:green;');
    }
}

/**
 * funcion que dispara la alertar, verifica que los errores del usuario
 * @param {*} alert elemento id que dispara la alerta
 * @param {*} messager texto de alerta
 */
function setAlertError(alert, messager = 'Debes llenar este campo.') {
    if (alert) {
        alert.innerHTML = messager;
        alert.setAttribute('style', 'color:red;');
    }
}

/**
 * funcion que muestra un ventana de noctificacion
 * @param {*} text texto de entrada
 */
function setAlertWindow(text, reload = false) {
    if (reload) {
        M.toast({
            html: text,
            displayLength: 3000,
            completeCallback: function () {
                location.reload(true);
            }
        });
    }else{
        M.toast({
            html: text,
            displayLength: 3000
        });
    }
}

/**
 * funcion que limpia las alertas
 * @param {*} alerts arreglo de alertas donde contiene 
 * información del html a modificar
 */
function clearAlert(alerts) {
    alerts.forEach(element => {
        element.innerHTML = '';
    });
}