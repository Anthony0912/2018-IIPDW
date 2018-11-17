/**
 * funcion encargada de guardar los datos al localstorage
 * @param {*} key que se usara para indentificar el objecto almacenado 
 * @param {*} value valor que se desea obtener
 */
function saveToLocalStorage(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
    return true;
}

/**
 * funcion que obtiene los datos seleccionado por llaves al localstorage
 * @param {*} key que se usuara para indentificar el objecto almacenado
 */
function getFromLocalStorage(key) {
    return JSON.parse(localStorage.getItem(key));
}