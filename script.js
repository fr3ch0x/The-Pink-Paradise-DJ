document.addEventListener('DOMContentLoaded', () => {
    const songInput = document.getElementById('songInput');
    const sendSongBtn = document.getElementById('sendSongBtn');
    const songList = document.getElementById('songList');
    const validationMessage = document.getElementById('validation-message');

    // Función para mostrar mensajes de validación
    const showValidationMessage = (message, isError = true) => {
        validationMessage.textContent = message;
        validationMessage.classList.add('show');
        if (isError) {
            validationMessage.style.color = '#ff3333'; // Rojo para errores
        } else {
            validationMessage.style.color = '#33ff33'; // Verde para éxito
        }
        // Ocultar el mensaje después de 3 segundos
        setTimeout(() => {
            validationMessage.classList.remove('show');
            validationMessage.textContent = ''; // Limpiar el texto
        }, 3000);
    };

    // Función para agregar una canción a la lista
    const addSongToList = (fullSongRequest) => {
        const trimmedRequest = fullSongRequest.trim();

        if (trimmedRequest === '') {
            showValidationMessage('Por favor, ingresa el nombre de la cancion y del artista.');
            return;
        }

        const parts = trimmedRequest.split('-');
        // Validar que haya al menos dos partes y que ninguna esté vacía
        if (parts.length < 2 || parts[0].trim() === '' || parts[1].trim() === '') {
            showValidationMessage('Formato incorrecto. Usa "Cancion - Artista".');
            return;
        }

        const songName = parts[0].trim();
        const artistName = parts[1].trim();

        const newLi = document.createElement('li');

        // Crear el enlace para YouTube
        const youtubeLink = document.createElement('a');
        const searchTerm = encodeURIComponent(`${songName} ${artistName}`);
        youtubeLink.href = `https://www.youtube.com/results?search_query=${searchTerm}`;
        youtubeLink.target = '_blank';
        youtubeLink.textContent = trimmedRequest;
        youtubeLink.classList.add('song-link');

        newLi.appendChild(youtubeLink);

        // Crear el botón de eliminar (ícono de papelera Unicode)
        const deleteButton = document.createElement('span');
        deleteButton.textContent = '🗑️'; // Icono de papelera Unicode
        // Si usaras Font Awesome, sería:
        // const deleteIcon = document.createElement('i');
        // deleteIcon.classList.add('fas', 'fa-trash'); // Clases de Font Awesome
        // deleteButton.appendChild(deleteIcon);
        deleteButton.classList.add('delete-button');
        newLi.appendChild(deleteButton);

        songList.appendChild(newLi);

        // Disparar animación de entrada (ya la gestiona el CSS con animation en #songList li)
        // newLi.style.animationDelay = `${songList.children.length * 0.05}s`; // Pequeño retraso para cada elemento si quieres un efecto escalonado

        deleteButton.addEventListener('click', () => {
            // Añadir clase para la animación de salida
            newLi.classList.add('fade-out');
            // Eliminar el elemento una vez que la animación haya terminado
            newLi.addEventListener('animationend', () => {
                songList.removeChild(newLi);
            }, { once: true }); // Para que el evento se dispare solo una vez
        });

        songInput.value = ''; // Limpiar el input
        showValidationMessage('Cancion añadida exitosamente!', false); // Mensaje de éxito
    };

    sendSongBtn.addEventListener('click', () => {
        addSongToList(songInput.value);
    });

    songInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            addSongToList(songInput.value);
        }
    });


    // Opcional: Agregar algunas canciones de ejemplo al cargar la página
    // Esto es solo para que veas el estilo funcionando sin tener que ingresar manualmente
    // addSongToList('Hola - Mi Artista');
    // addSongToList('Gasolina - Daddy Yankee');
    // addSongToList('Dale Don Dale - Don Omar');
});