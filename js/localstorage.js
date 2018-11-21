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

/**
 * funcion en caragada ingresar los datos al localstrage verificando primero si existe la llave del localstorage
 * @param {*} newData nuevos datos que se agregaran al localstorage
 * @param {*} nameObject nombre de la llave que se usara para meter los nuevos datos al localstorage
 */
function addItemsToTheArray(newData, nameObject) {
    let tempArray = getFromLocalStorage(nameObject);
    if (!tempArray) {
        tempArray = [];
    }
    tempArray.push(newData);
    return saveToLocalStorage(nameObject, tempArray);
}