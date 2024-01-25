$(document).ready(function() {
    var personajesJson; // Cambié el nombre a personajesJson

    function cargarPersonajes() {
        $.ajax({
            url: 'assets/json/characters.json',
            dataType: 'json',
            success: function(data) {
                personajesJson = data;
                mostrarPersonajes();
            },
            error: function(xhr, status, error) {
                console.error('Error al cargar el archivo JSON:', status, error);
            }
        });
    }

    function mostrarPersonajes() {
        var container = $('#episodios-container');

        personajesJson.forEach(function(personaje) {
            var personajeDiv = $('<div class="personajecard personaje"></div>');
            personajeDiv.append('<img class="modelo" src="' + obtenerEnlaceImagen(personaje.img) + '" alt="' + personaje.name + '">');
            personajeDiv.append('<h2>' + personaje.name + '</h2>');
            personajeDiv.append('<br>');
            personajeDiv.append('<p>Nombre: ' + personaje.name + '</p>');
            personajeDiv.append('<p>Apodo: ' + (personaje.alias ? personaje.alias.join(', ') : '') + '</p>');
            personajeDiv.append('<p>Edad: ' + personaje.age + '</p>');
            personajeDiv.append('<p>Lugar de nacimiento: ' + personaje.birthplace + '</p>');
            personajeDiv.append('<p>Raza: ' + (personaje.species ? personaje.species.join(', ') : '') + '</p>');
            personajeDiv.append('<p>Peso: ' + (personaje.weight ? personaje.weight : 'N/A') + '</p>');
            personajeDiv.append('<p>Tamaño: ' + (personaje.height ? personaje.height : 'N/A') + '</p>');

            container.append(personajeDiv);
        });
    }

    cargarPersonajes();
});

function obtenerEnlaceImagen(originalLink) {
    // Verificar si el enlace es undefined o no es una cadena válida
    if (originalLink === undefined || typeof originalLink !== 'string' || originalLink.trim() === '') {
        console.error('El enlace de la imagen no es una cadena válida:', originalLink);
        return ''; // Devolver una cadena vacía o el enlace correcto según tus necesidades
    }

    // Buscar el índice de la cadena ".png", ".jpg" o ".jpeg" en el enlace
    var indicePng = originalLink.toLowerCase().indexOf('.png');
    var indiceJpg = originalLink.toLowerCase().indexOf('.jpg');
    var indiceJpeg = originalLink.toLowerCase().indexOf('.jpeg');

    // Encontrar el índice más pequeño entre ".png", ".jpg" y ".jpeg"
    var indices = [indicePng, indiceJpg, indiceJpeg].filter(function (indice) {
        return indice !== -1;
    });

    var indiceMinimo = Math.min.apply(null, indices);

    // Verificar si alguna de las extensiones se encuentra en el enlace
    if (indiceMinimo !== Infinity) {
        // Extraer la subcadena desde el inicio hasta el índice de la extensión y agregar la extensión al final
        var enlaceCorrecto = originalLink.substring(0, indiceMinimo + 4);
        return enlaceCorrecto;
    } else {
        console.error('No se pudo encontrar ".png", ".jpg" o ".jpeg" en el enlace:', originalLink);
        return originalLink; // Devuelve el enlace original si no se encuentra ninguna de las extensiones
    }
}
