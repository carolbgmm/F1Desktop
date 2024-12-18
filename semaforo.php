<?php
    class Record{
        protected $server;
        protected $user;
        protected $password;
        protected $dbname;
        protected $conn;

        public function __construct(){
            $this->server = "localhost";
            $this->server = "localhost";
            $this->user = "DBUSER2024";
            $this->password = "DBPSWD2024";
            $this->dbname = "records";
            $this->conn = new mysqli($this->server, $this->user, $this->password, $this->dbname);
        }

        public function insertarRecord($nombre, $apellidos, $nivel, $tiempo)
        {
            $sql = "INSERT INTO registro (nombre, apellidos, nivel, tiempo) VALUES (?, ?, ?, ?)";
            $stmt = $this->conn->prepare($sql);
            $stmt->bind_param("ssss", $nombre, $apellidos, $nivel, $tiempo);
            $stmt->execute();
            $stmt->close();
        }

        public function getBest($nivel)
        {
            $sql = "SELECT nombre, apellidos, tiempo FROM registro WHERE nivel = ? ORDER BY tiempo ASC LIMIT 10";
            $stmt = $this->conn->prepare($sql);
            $stmt->bind_param("s", $nivel);
            $stmt->execute();
            $result = $stmt->get_result();

            echo "<h3>Mejores puntuaciones para nivel " .$nivel. "</h3>";
            echo "<ol>";
            while ($row = $result->fetch_assoc()) {
                echo "<li>";
                echo "Nombre: " . $row["nombre"] . " " . $row["apellidos"] . ", Tiempo: " . $row["tiempo"];
                echo "</li>";
            }
            echo "</ol>";
        }

        public function closeConnection(){
            $this->conn->close();
        }
    }


?>

<!DOCTYPE HTML>

<html lang="es">
<head>
    <meta charset="UTF-8" />
    <title>F1 Desktop juegos, memoria</title>
    <meta name="description" content="Página de juego de semáforo de F1D"/>
    <meta name="keywords" content="F1,desktop,semaforo"/>
    <meta name ="viewport" content ="width=device-width, initial-scale=1.0" />
    <meta name="author" content="Carolina Barrios Gonzalez"/>
    <link rel="stylesheet" type="text/css" href="estilo/estilo.css" />
    <link rel="stylesheet" type="text/css" href="estilo/layout.css" />
    <link rel="stylesheet" type="text/css" href="estilo/semaforo.css" />
    <link rel="icon" href="multimedia/imagenes/favicon.ico"/>
    <script src="js/semaforo.js"></script>
    <script src="http://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js"></script>
</head>
<body>
    <header>
        <h1><a href="index.html" title="inicio">F1 Desktop</a></h1>
        <nav>
            <a href="index.html" accesskey="i" tabindex="1" title="inicio">Inicio</a>
            <a href="piloto.html" accesskey="p" tabindex="2" title="piloto">Piloto</a>
            <a href="noticias.html" accesskey="n" tabindex="3" title="noticias">Noticias</a>
            <a href="calendario.html" accesskey="c" tabindex="4" title="calendario">Calendario</a>
            <a href="meteorologia.html" accesskey="m" tabindex="5" title="meteorologia">Meteorologia</a>
            <a href="circuito.html" accesskey="r" tabindex="6" title="circuito">Cirtuito</a>
            <a href="viajes.php" accesskey="v" tabindex="7" title="viajes">Viajes</a>
            <a href="juegos.html" accesskey="j" tabindex="8" title="juegos">Juegos</a>
        </nav>
    </header>
    <main>
        <p>Estás en: <a href="index.html" title="inicio">Inicio</a> >> <a href="juegos.html" title="juegos">Juegos</a> >> Semáforo</p>
        <h2> Juegos</h2>
        <nav>
            <a href="memoria.html" accesskey="e" tabindex="1">Memoria</a>
            <a href="semaforo.php" accesskey="s" tabindex="2">Semáforo</a>
            <a href="api.php" accesskey="a" tabindex="2">API</a>
            <a href="php/recetario.php" accesskey="s" tabindex="2">Recetario</a>
        </nav>
        
        <script>var semaforo = new Semaforo();</script>

        <?php
        if (count($_POST) > 0) {
            $record = new Record();
            $record->insertarRecord($_POST['nombre'], $_POST['apellidos'], $_POST['nivel'], $_POST['tiempo']);
            $record->getBest($_POST['nivel']);
            $record->closeConnection();
        }
        ?>
    </main>
</body>