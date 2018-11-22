/**
 * funcion que obtiene los datos seleccionado por llaves al sessionstorage
 * @param {*} key que se usuara para indentificar el objecto almacenado
 */
function getFromSessionStorage(key) {
    return JSON.parse(sessionStorage.getItem(key));
}

/**
 * funcion en captura los datos son enviados al sessionstorage 
 * @param {*} key llave que se usara para identificar el objecto almacenado
 * @param {*} value valores que se meteran en el sessionstorage
 */
function saveToSessionStorage(key, value) {
    sessionStorage.setItem(key, JSON.stringify(value));
    return true;
}