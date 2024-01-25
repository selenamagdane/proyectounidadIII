$(document).ready(function() {
    // Variable para almacenar la información de los episodios
    var episodiosJson;

    // Función para cargar el JSON y luego mostrar los episodios
    function cargarEpisodios() {
        $.ajax({
            url: 'assets/json/episodes.json',  // Ajusta la ruta según la estructura de tu proyecto
            dataType: 'json',
            success: function(data) {
                episodiosJson = data;  // Almacena el JSON en la variable episodiosJson
                mostrarEpisodios();  // Llama a la función para mostrar los episodios después de cargar el JSON
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
            episodioDiv.append('<img class="modelo" src="' + episodio.img + '" alt="' + episodio.name + '">');
            episodioDiv.append('<h2>' + episodio.name + '</h2>');
            episodioDiv.append('<br>');
            episodioDiv.append('<p>Episodio: ' + episodio.episode + '</p>');

            // Puedes agregar lógica para obtener y mostrar nombres de personajes aquí
            // Puedes hacer solicitudes AJAX a las URLs de los personajes si es necesario

            container.append(episodioDiv);
        });
    }

    // Llamar a la función para cargar el JSON y mostrar los episodios
    cargarEpisodios();
});
