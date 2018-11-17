/**
 *  Funcion que inicializa javascript materialize 
 * */
function activeScriptMaterialize() {
    document.addEventListener('DOMContentLoaded', function () {
        M.AutoInit();
    });
}

/**
 * Funcion que ayuda que cuando el usuario percione el boton
 * donde esta la bienvenida, lo redirecione facilmente al apartado
 * de los rides
 */
function scroll() {
    $(document).ready(function () {
        // Add smooth scrolling to all links
        $("#link").on('click', function (event) {

            // Make sure this.hash has a value before overriding default behavior
            if (this.hash !== "") {
                // Prevent default anchor click behavior
                event.preventDefault();

                // Store hash
                var hash = this.hash;

                // Using jQuery's animate() method to add smooth page scroll
                // The optional number (800) specifies the number of milliseconds it takes to scroll to the specified area
                $('html, body').animate({
                    scrollTop: $(hash).offset().top
                }, 800, function () {

                    // Add hash (#) to URL when done scrolling (default click behavior)
                    window.location.hash = hash;
                });
            } // End if
        });
    });
}

scroll();
activeScriptMaterialize();