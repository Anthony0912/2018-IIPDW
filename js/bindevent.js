/**
 * funcion en cargada que en el input tipo text se pueda solo se pueda precionar números
 */
function bindEventsKeyPressInputText() {
    jQuery('#phone').bind('keypress', (element) => {
        validationOnlyNumber()
    });
}

/**
 * funcion que dispara los eventos de los botones
 */
function bindEventsButton() {
    jQuery('#btn_register').bind('click', (element) => {
        validationRegister();
    });
    jQuery('#btn_login').bind('click', (element) => {
        validationLogin();
    });
    jQuery('#close-session').bind('click', (element) => {
        closeSession();
    });
    jQuery('#btn_ride').bind('click', (element) => {
        validationRide();
    });

}

/**
 * funcion de dispara el eventos de keyup a los campos de texto
 */
function bindEventsKeyUpInputText() {
    jQuery('#name').bind('keyup', (element) => {
        alertRegister();
    });
    jQuery('#lastname').bind('keyup', (element) => {
        alertRegister();
    });
    jQuery('#phone').bind('keyup', (element) => {
        alertRegister();
    });
    jQuery('#username').bind('keyup', (element) => {
        alertRegister();
    });
    jQuery('#passwd').bind('keyup', (element) => {
        alertRegister();
    });
    jQuery('#passwd-repeat').bind('keyup', (element) => {
        alertRegister();
    });
    jQuery('#user').bind('keyup', (element) => {
        alertLogin();
    });
    jQuery('#password').bind('keyup', (element) => {
        alertLogin();
    });
    jQuery('#ride-name').bind('keyup', (element) => {
        alertRide();
    });
    jQuery('#start').bind('keyup', (element) => {
        alertRide();
    });
    jQuery('#end').bind('keyup', (element) => {
        alertRide();
    });
    jQuery('#description').bind('keyup', (element) => {
        alertRide();
    });
    jQuery('#start-time').bind('keyup', (element) => {
        alertRide();
    });
    jQuery('#end-time').bind('keyup', (element) => {
        alertRide();
    });
}
/**
 * llamada de los metodos que contienen los eventos
 */
bindEventsKeyUpInputText();
bindEventsButton();
bindEventsKeyPressInputText();
loadDataUser();