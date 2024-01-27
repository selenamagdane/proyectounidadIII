$(document).ready(function() {
    var titanesJson;
    var titanesOriginales;

    function cargarTitanes() {
        $.ajax({
            url: 'assets/json/titans.json',
            dataType: 'json',
            success: function(data) {
                titanesJson = data;
                titanesOriginales = data;
                mostrarTitanes(titanesJson);
            },
            error: function(xhr, status, error) {
                console.error('Error al cargar el archivo JSON:', status, error);
            }
        });
    }

    function mostrarTitanes(titanes) {
        var container = $('#titanes-container');
        container.empty();

        titanes.forEach(function(titan) {
            var titanDiv = $('<div class="titanescard"></div>');
            titanDiv.append('<img class="modelo" src="' + obtenerEnlaceImagen(titan.img) + '" alt="' + titan.name + '">');
            titanDiv.append('<h2>' + titan.name + '</h2>');
            titanDiv.append('<br>');
            titanDiv.append('<p>Tamaño: ' + (titan.height ? titan.height : 'N/A') + '</p>');
            titanDiv.append('<p>Habilidades: ' + (titan.abilities ? titan.abilities.join(', ') : 'N/A') + '</p>');
            titanDiv.append('<p>Heredero actual: <a class="enlaceHerederoActual" href="ventanaprueba.html">Ver heredero actual</a></p>');

            var formerInheritorsList = titan.former_inheritors.map(function(inheritor) {
                return '<a href="' + inheritor + '">Heredero anterior</a>';
            });

            titanDiv.append('<p>Herederos anteriores: ' + (formerInheritorsList.length > 0 ? formerInheritorsList.join(', ') : 'N/A') + '</p>');
            titanDiv.append('<p>Alianza: ' + (titan.allegiance ? titan.allegiance : 'N/A') + '</p>');
            
            var herederosLink = $('<a href="ventanaprueba.html">HEREDEROS</a>');
            herederosLink.click(function() {
                // Almacenar en el Local Storage el valor del atributo 'id'
                localStorage.setItem('titanId', titan.id);
            });
            titanDiv.append(herederosLink);

            container.append(titanDiv);
        });
        

        /*
        // Evento clic en "Ver heredero actual"
        $('.enlaceHerederoActual').click(function(event) {
            event.preventDefault();
            var idHerederoActual = obtenerIdHerederoActual($(this).attr('href'));
            mostrarPersonajesPorId(idHerederoActual);
        });
        */
    }

    function obtenerIdHerederoActual(url) {
        // Extraer el número al final de la URL
        var match = url.match(/\/(\d+)$/);
        return match ? match[1] : null;
    }

    function mostrarHerederosActuales(herederos) {
        localStorage.setItem('herederosActuales', JSON.stringify(herederos));
        window.location.href = 'personajes.html';
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

    // Cargar los titanes al iniciar la página
    cargarTitanes();
});
