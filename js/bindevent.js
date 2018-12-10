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
        validationLogin();
        validationSetting();
        validationRide();
    });
    jQuery('input.search').bind('keyup', (element) => {
        loadTableDataIndex('ridesIndex', $('#start').val(), $('#end').val());
    });
}

/**
 * funcion que registra al usuario al hacer click en el boton
 */
function bindEventClick() {
    jQuery('#btn_register').bind('click', (element) => {
        registerUser();
    });
    jQuery('#btn_login').bind('click', (element) => {
        loginUser();
    });
    jQuery('#btn_setting').bind('click', (element) => {
        settingUser();
    });
    jQuery('#btn_rides').bind('click', (element) => {
        createRide();
    });
    jQuery('#btn_updateRides').bind('click', (element) => {
        editRide();
    });
    jQuery('a.close-session').bind('click', (element) => {
        closeSession();
    });
}

/**
 * Lugar donde se disparan las funciones
 */
activeScriptMaterialize();
bindEventsKeyPressInputText();
bindEventKeyUp();
bindEventClick();
loadDataToUser();
loadSetting();
loadTableData('rides');
loadTableDataIndex('ridesIndex', $('#start').val() ? $('#start').val() : '', $('#end').val() ? $('#start').val() : '');