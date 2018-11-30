/**
 * funcion en cargada que en el input tipo text se pueda solo se pueda precionar números
 */
function bindEventsKeyPressInputText() {
    jQuery('#phone').bind('keypress', (element) => {
        validationOnlyNumber()
    });
}

/**
 * funcion que verifica los campos que no esten vacios con el
 * evento keyup
 */
function bindEventKeyUp() {
    jQuery('input.validate').bind('keyup', (element) => {
        validationRegister();
    });
}

/**
 * funcion que registra al usuario al hacer click en el boton
 */
function bindEventClick() {
    jQuery('#btn_register').bind('click', (Element) => {
        registerUser();
    });
    jQuery('a.close-session').bind('click', (element) => {
        closeSession();
    });
}

/**
 * Lugar donde se disparan las funciones
 */
bindEventsKeyPressInputText();
bindEventKeyUp();
bindEventClick();
loadDataToUser();