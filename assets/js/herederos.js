$(document).ready(() => {
    let nombreTitan;
    let actual;
    let anteriores = [];

        console
    obtenerIds();

    function obtenerIds() {
        $.ajax({
            type: 'GET',
            url: 'assets/json/titans.json',
            dataType: 'json',
            async: true,
            success: function(data) {
                let titanId = localStorage.getItem('titanId');
                if (titanId) {
                    nombreTitan = data[titanId].name;

                    actual = obtenerIdHeredero(data[titanId]["current_inheritor"]);
                    data[titanId]["former_inheritors"].forEach(former =>
                        anteriores.push(obtenerIdHeredero(former))
                    );
                    
                    console.log(`Titan -> ${titanId}`);
                    console.log(`Actual -> ${actual}`);
                    console.log(`Anteriores -> ${anteriores}`);

                    $.ajax({
                        type: 'GET',
                        url: 'assets/json/characters.json',
                        dataType: 'json',
                        async: true,
                        success: function(personajes) {
                            console.log(personajes);
                            $('#personajes-container').append(`<h1>${nombreTitan}</h1>`);
                            $('#personajes-container').append('<h3>Heredero actual</h3>');
                            // print statement
                            console.log(personajes.find(personaje => personaje.id == actual));
                            mostrarPersonaje(personajes.find(personaje => personaje.id == actual));
                        
                            $('#personajes-container').append('<h3>Heredero anteriores</h3>');
                            anteriores.forEach(portadorAnterior => {
                                mostrarPersonaje(personajes.find(personaje => personaje.id === portadorAnterior));
                            });
                        },
                    })

                } else {
                    console.error('titanId is null or undefined');
                }

                // RENDERI

            },
            error: function(xhr, status, error) {
                console.error('Error al cargar el archivo JSON:', status, error);
            }
        });

        // CREAR METODO PARA OBTENER DATOS SOLO DE UN ID
    }

    function obtenerIdHeredero(url) {
        // Ensure the URL is not null or undefined
        if (url) {
            // Extract the number at the end of the URL
            var match = url.match(/\/(\d+)$/);
            return match ? match[1] : null;
        }
        return null; // Return null for invalid or missing URL
    } 
    
    function mostrarPersonaje(personaje) {
        var container = $('#personajes-container');
    
        if (personaje) { // Verificar si el personaje no es undefined
            var personajeDiv = $('<div class="herederoscard"></div>');
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
        } else {
            console.error('El personaje no fue encontrado.');
        }
    }    

    function obtenerEnlaceImagen(originalLink) {
        if (originalLink === undefined || typeof originalLink !== 'string' || originalLink.trim() === '') {
            console.error('El enlace de la imagen no es una cadena válida:', originalLink);
            return '';
        }

        var indicePng = originalLink.indexOf('.png');
        var indiceJpg = originalLink.indexOf('.jpg');
        var indiceJpeg = originalLink.indexOf('.jpeg');
        var indices = [indicePng, indiceJpg, indiceJpeg].filter(function(indice) {
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
});