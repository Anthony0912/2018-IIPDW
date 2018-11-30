/**
 * funcion que obtiene los datos del formulario registro del usuario
 */
function objectRegister() {
    let name = $.trim($('#name').val());
    let lastName = $.trim($('#lastname').val());
    let phone = $.trim($('#phone').val());
    let userName = $.trim($('#username').val().toLowerCase());
    let passwd = $.trim($('#passwd').val());
    let speed = $.trim($('#speed').val());
    let aboutMe = $.trim($('#about-me').val());

    const person = {
        name,
        lastName,
        phone,
        userName,
        passwd,
        speed,
        aboutMe
    }

    return person;
}
