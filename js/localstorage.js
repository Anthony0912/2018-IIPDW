/**
 * funcion encargada de guardar los datos al localstorage
 * @param {*} key llave que se usara para indentificar el objecto almacenado 
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

/**
 * funcion en caragada ingresar los datos al localstrage verificando primero si existe la llave del localstorage
 * @param {*} newData nuevos datos que se agregaran al localstorage
 * @param {*} key nombre de la llave que se usara para meter los nuevos datos al localstorage
 */
function addItemsToTheArray(key, value) {
    let tempArray = getFromLocalStorage(key);
    if (!tempArray) {
        tempArray = [];
    }
    tempArray.push(value);
    return saveToLocalStorage(key, tempArray);
}

/**
 * funcion encargada de limpiar el localstorage
 * @param {*} key llave donde de ubica en el localstorage
 */
function removeKeyLocalstorage(key) {
    localStorage.removeItem(key);
    return true;
}