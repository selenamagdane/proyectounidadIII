$(document).ready(function() {
    var personajesJson;
    var personajesOriginales; // Mantener una copia original

    function cargarPersonajes() {
        $.ajax({
            url: 'assets/json/characters.json',
            dataType: 'json',
            success: function(data) {
                personajesJson = data;
                personajesOriginales = data; // Guardar la copia original
                mostrarPersonajes(personajesJson);
            },
            error: function(xhr, status, error) {
                console.error('Error al cargar el archivo JSON:', status, error);
            }
        });
    }

    function mostrarPersonajes(personajes) {
        var container = $('#episodios-container');

        container.empty(); // Limpiar el contenedor

        personajes.forEach(function(personaje) {
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

    function obtenerEnlaceImagen(originalLink) {
        if (originalLink === undefined || typeof originalLink !== 'string' || originalLink.trim() === '') {
            console.error('El enlace de la imagen no es una cadena válida:', originalLink);
            return '';
        }

        var indicePng = originalLink.indexOf('.png');
        var indiceJpg = originalLink.indexOf('.jpg');
        var indiceJpeg = originalLink.indexOf('.jpeg');
        var indices = [indicePng, indiceJpg, indiceJpeg].filter(function (indice) {
            return indice !== -1;
        });
        var indiceMinimo = Math.min.apply(null, indices);

        if (indiceMinimo !== Infinity) {
            var enlaceCorrecto = originalLink.substring(0, indiceMinimo + 4);
            return enlaceCorrecto;
        } else {
            console.error('No se pudo encontrar ".png", ".jpg" o ".jpeg" en el enlace.');
            return originalLink;
        }
    }

    // Evento click para los botones
    $('.personajesclasifi').click(function() {
        var clasificacion = this.id;

        // Filtrar los personajes originales por clasificación
        var personajesFiltrados = personajesOriginales.filter(function(personaje) {
            return (
                (personaje.species && personaje.species.includes(clasificacion)) ||
                (personaje.occupation && personaje.occupation.includes(clasificacion))
            );
        });

        // Mostrar los personajes filtrados
        mostrarPersonajes(personajesFiltrados);
    });

    // Cargar los personajes al iniciar la página
    cargarPersonajes();
});
