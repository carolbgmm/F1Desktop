<?php
    
    class Carrusel{
        protected $etiqueta;
        protected $nCircuito;

        public function __construct($etiqueta, $nCircuito){
            $this->etiqueta = $etiqueta;
            $this->nCircuito = $nCircuito;
        }

        public function getImages() {
            $api_key = '5f7abf4593d8b8005a0a9e43d8006dfc';
            $perPage = 10;
            // Fotos públicas recientes
            $url = 'http://api.flickr.com/services/feeds/photos_public.gne?';
            $url .= '&api_key=' . $api_key;
            $url .= '&tags=' . $this->nCircuito . ',' . $this->etiqueta;
            $url .= '&per_page=' . $perPage;
            $url .= '&format=json';
            $url .= '&nojsoncallback=1';

            $respuesta = file_get_contents($url);
            $json = json_decode($respuesta);

            if ($json == null) {
                echo "<h3>Error en el archivo JSON recibido</h3>";

            } else {
                echo "<aside>";
                echo "<article>";
                echo "<h3>Carrusel de imágenes</h3>";
                $i = 1;
                foreach ($json->items as $item) {
                    if ($i > 10)
                        break;
                    echo "<img src='" . $item->media->m . "' alt='Imagen " . $i . "' />";
                    $i++;
                }
                echo "</article>";
                echo "</aside>";
            }
        }
    }

?>

<!DOCTYPE HTML>

<html lang="es">
<head>
    <!-- Datos que describen el documento -->
    <meta charset="UTF-8" />
    <title>F1 Desktop viajes</title>
    <meta name="description" content="viajes"/>
    <meta name="keywords" content="viajes"/>
    <meta name ="viewport" content ="width=device-width, initial-scale=1.0" />
    <meta name="author" content="Carolina Barrios Gonzalez"/>
    <link rel="stylesheet" type="text/css" href="estilo/estilo.css" />
    <link rel="stylesheet" type="text/css" href="estilo/layout.css" />
    <link rel="stylesheet" type="text/css" href="estilo/viajes.css" />
    <link rel="icon" href="multimedia/imagenes/favicon.ico"/>
    <script src="http://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js"></script>
    <script src="js/viajes.js"></script>
    <script src="js/pais.js"></script>
</head>

<body>
    <!-- Datos con el contenidos que aparece en el navegador -->
    <header>
        <h1><a href="index.html" title="inicio">F1 Desktop</a></h1>
        <nav>
            <a href="index.html" accesskey="i" tabindex="1" title="inicio">Inicio</a>
            <a href="piloto.html" accesskey="p" tabindex="2" title="piloto">Piloto</a>
            <a href="noticias.html" accesskey="n" tabindex="3" title="noticias">Noticias</a>
            <a href="calendario.html" accesskey="c" tabindex="4" title="calendario">Calendario</a>
            <a href="meteorologia.html" accesskey="m" tabindex="5" title="meteorologia">Meteorologia</a>
            <a href="circuito.html" accesskey="r" tabindex="6" title="circuito">Cirtuito</a>
            <a href="viajes.html" accesskey="v" tabindex="7" title="viajes">Viajes</a>
            <a href="juegos.html" accesskey="j" tabindex="8" title="juegos">Juegos</a>
        </nav>
    </header>
    <p>Estás en: <a href="index.html" title="inicio">Inicio</a> >> Viajes</p>
    <h2>Viajes</h2>
    <main>
        <input type="button" value="Obtener mapa estático" onClick = "viajes.getMapaEstaticoGoogle('ubicacion');"/>
        <div id="ubicacion"></div>
        <script async defer src="https://maps.googleapis.com/maps/api/js?key=AIzaSyD3k7yZNPOEKeeFsGYF0329YKwyMWL6MsY&callback=viajes.initMap"></script>
        <?php
            $carrusel = new Carrusel("F1", "Barcelona-Catalunya");
            $carrusel->getImages();
        ?>
        <script>viajes.showCarrusel();</script>
    </main>

</body>
</html>