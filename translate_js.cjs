const fs = require('fs');
const path = require('path');

const jsDir = './js';
const files = fs.readdirSync(jsDir).filter(f => f.endsWith('.js')).map(f => path.join(jsDir, f));

const replacements = [
    ["'Failed to load'", "'Error al cargar'"],
    ["'Loading...'", "'Cargando...'"],
    ["`Cache: ${stats.memoryEntries}/${stats.maxSize} entries`", "`Caché: ${stats.memoryEntries}/${stats.maxSize} entradas`"],
    ["'Invalid Track ID'", "'ID de pista inválido'"],
    ["'Track not found'", "'Pista no encontrada'"],
    ["`Added \"${trackData.title}\" to playlist`", "`Se añadió \"${trackData.title}\" a la playlist`"],
    ["'Failed to add track to playlist'", "'Error al añadir la pista a la playlist'"],
    ["'Playlist added to folder'", "'Playlist añadida a la carpeta'"],
    ["'All tracks in queue are already liked'", "'Todas las pistas en la cola ya tienen tu me gusta'"],
    ["'No playlists yet. Create one first.'", "'Aún no hay playlists. Crea una primero.'"],
    ["'Failed to add tracks to playlist'", "'Error al añadir pistas a la playlist'"],
    ["'Failed to add playlist to folder'", "'Error al añadir la playlist a la carpeta'"],
    ["'Sleep timer cancelled'", "'Temporizador de apagado cancelado'"],
    ["'This track is unavailable.'", "'Esta pista no está disponible.'"],
    ["'This album is blocked'", "'Este álbum está bloqueado'"],
    ["`Playing next: ${tracks.length} tracks`", "`Reproduciendo a continuación: ${tracks.length} pistas`"],
    ["`Failed to process ${type} action`", "`Error al procesar la acción de ${type}`"],
    ["'This track is blocked'", "'Esta pista está bloqueada'"],
    ["'No mix available for this track'", "'No hay mix disponible para esta pista'"],
    ["'Link copied to clipboard!'", "'Enlace copiado al portapapeles!'"],
    ["'No original URL available for this track.'", "'No hay URL original disponible para esta pista.'"],
    ["'No album information available'", "'No hay información del álbum disponible'"],
    ["'No artist information available'", "'No hay información del artista disponible'"],
    ["'Please enter a valid number of minutes'", "'Por favor introduce un número válido de minutos'"],
    ["'This track is already being downloaded'", "'Esta pista ya se está descargando'"],
    ["'Failed to play album'", "'Error al reproducir el álbum'"],
    ["'Shuffling album'", "'Reproduciendo álbum aleatoriamente'"],
    ["'Failed to shuffle album'", "'Error al reproducir el álbum aleatoriamente'"],
    ["'Shuffling artist discography'", "'Reproduciendo discografía del artista aleatoriamente'"],
    ["'Failed to shuffle artist tracks'", "'Error al reproducir pistas del artista aleatoriamente'"],
    ["`${tracks.length} tracks • ${formatDuration(totalDuration)}`", "`${tracks.length} pistas • ${formatDuration(totalDuration)}`"],
    ["`${playlist.numberOfTracks} tracks • ${formatDuration(totalDuration)}`", "`${playlist.numberOfTracks} pistas • ${formatDuration(totalDuration)}`"],
    ["`${updatedPlaylist.tracks.length} tracks • ${formatDuration(totalDuration)}`", "`${updatedPlaylist.tracks.length} pistas • ${formatDuration(totalDuration)}`"],
    ["'Select Music Folder'", "'Seleccionar carpeta de música'"],
    ["'No description provided.'", "'No se proporcionó descripción.'"],
    ["'No unreleased projects'", "'No hay proyectos sin lanzamientos'"],
    ["'Read More'", "'Leer más'"],
];

for (const file of files) {
    let content = fs.readFileSync(file, 'utf8');
    let changed = false;
    for (const [eng, esp] of replacements) {
        if (content.includes(eng)) {
            content = content.replace(new RegExp(eng.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g'), esp);
            changed = true;
        }
    }
    if (changed) {
        fs.writeFileSync(file, content, 'utf8');
        console.log(`Updated ${file}`);
    }
}
