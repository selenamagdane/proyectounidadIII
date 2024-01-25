$(document).ready(function() {
 
    var episodiosJson;

    // Función para cargar el JSON y luego mostrar los episodios
    function cargarEpisodios() {
        $.ajax({
            url: 'assets/json/episodes.json',  // Ajusta la ruta según la estructura de tu proyecto
            dataType: 'json',
            success: function(data) {
                episodiosJson = data;  // Almacena el JSON en la variable episodiosJson
                mostrarEpisodios();  
            },
            error: function() {
                console.error('Error al cargar el archivo JSON.');
            }
        });
    }

    // Función para mostrar los episodios en la página
    function mostrarEpisodios() {
        var container = $('#episodios-container');

        episodiosJson.forEach(function(episodio) {
            var episodioDiv = $('<div class="episodio"></div>');
            episodioDiv.append('<img class="modelo" src="' + obtenerEnlaceImagen(episodio.img) + '" alt="' + episodio.name + '">');
            episodioDiv.append('<h2>' + episodio.name + '</h2>');
            episodioDiv.append('<br>');
            episodioDiv.append('<p>Episodio: ' + episodio.episode + '</p>');

            // Puedes agregar lógica para obtener y mostrar nombres de personajes aquí
            // Puedes hacer solicitudes AJAX a las URLs de los personajes si es necesario

            container.append(episodioDiv);
        });
    }

    cargarEpisodios();
});

function obtenerEnlaceImagen(originalLink) {
    // Buscar el índice de la cadena ".png", ".jpg" o ".jpeg" en el enlace
    var indicePng = originalLink.indexOf('.png');
    var indiceJpg = originalLink.indexOf('.jpg');
    var indiceJpeg = originalLink.indexOf('.jpeg');

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
        console.error('No se pudo encontrar ".png", ".jpg" o ".jpeg" en el enlace.');
        return originalLink; // Devuelve el enlace original si no se encuentra ninguna de las extensiones
    }
}