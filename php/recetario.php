<?php

    session_start();

    class Receta{
        protected $server;
        protected $user;
        protected $password;
        protected $dbname;
        protected $conn;
        protected $counter;

        public function __construct(){
            $this->counter = 0;
            $this->server = "localhost";
            $this->server = "localhost";
            $this->user = "DBUSER2024";
            $this->password = "DBPSWD2024";
            $this->dbname = "recetario";
            $this->conn = new mysqli($this->server, $this->user, $this->password, $this->dbname);
           
            if ($this->conn->connect_error) {
                die("Conexión fallida: " . $this->conn->connect_error);
            }
        }

        public function getCategorias(){
            $sql = "SELECT * FROM categoria";
            foreach ($this->conn->query($sql) as $row) {
                echo "<option value='" . $row['id_categoria'] . "'>" . $row['nomre_categoria'] . "</option>";
            }
        }

        public function addInstruccion($instruccion){
            if (!isset($_SESSION['instrucciones'])) {
                $_SESSION['instrucciones'] = array();  // Si no existe, se crea el array
            }
    
            $_SESSION['instrucciones'][] = $instruccion;
        }

        public function addIngrediente($nombre, $cantidad){
            if (!isset($_SESSION['ingredientes']) || !is_array($_SESSION['ingredientes'])) {
                $_SESSION['ingredientes'] = array();  // Si no existe, se crea el array
            }
    
            $_SESSION['ingredientes'][] = array("nombre" => $nombre, "cantidad" => $cantidad);
        }

        public function getIntrucciones(){
            foreach ($_SESSION['instrucciones'] as $instruccion) {
                echo "<p>" . $instruccion . "</p>";
            }
        }

        public function getIngredientes(){
            foreach ($_SESSION['ingredientes'] as $ingrediente) {
                echo "<p>" . json_encode($ingrediente) . "</p>";
            }
        }

        public function añadirReceta($nombre, $categoria){
            // Validar si existen ingredientes e instrucciones
            if (empty($_SESSION['ingredientes']) || empty($_SESSION['instrucciones'])) {
                echo "<p>La receta no se puede añadir porque faltan ingredientes o instrucciones.</p>";
                return;
            }

            // Comenzar la transacción
            $this->conn->begin_transaction();

            echo "<script>console.log('iniciando transaccion')</script>";

            try {
                $sqlIdReceta = $this->conn->query("SELECT COUNT(*) FROM receta");
                $row = $sqlIdReceta->fetch_row(); // Obtiene el resultado como un array numérico
                $idReceta = (int)$row[0]; // convierte a un entero


                // Insertar la receta en la tabla `receta`
                $stmtReceta = $this->conn->prepare("INSERT INTO receta (id_receta, id_categoria, nombre_receta) VALUES (?, ?, ?)");
                $stmtReceta->bind_param("iis",$idReceta, $categoria, $nombre);
                $stmtReceta->execute();
        
                // Obtener el ID de la receta recién insertada
                echo "<script>console.log('id receta')</script>";
        
                // Insertar las instrucciones en la tabla `instrucciones`
                $stmtInstruccion = $this->conn->prepare(
                    "INSERT INTO instrucciones (id_receta, orden, descripción) VALUES (?, ?, ?)"
                );
                
                echo "<script>console.log('instrucciones')</script>";

                $orden = 1;
                foreach ($_SESSION['instrucciones'] as $instruccion) {
                    $stmtInstruccion->bind_param("iis", $idReceta, $orden, $instruccion);
                    $stmtInstruccion->execute();
                    $orden++;
                }
        
                // Insertar los ingredientes en las tablas `ingredientes` y `receta_ingredientes`
                $stmtIngrediente = $this->conn->prepare("INSERT INTO ingredientes (nombre_ingrediente) VALUES (?)");
                $stmtRecetaIngrediente = $this->conn->prepare(
                    "INSERT INTO receta_ingredientes (id_receta, id_ingrediente, cantidad) VALUES (?, ?, ?)"
                );
        
                foreach ($_SESSION['ingredientes'] as $ingrediente) {
                    // Verificar si el ingrediente ya existe
                    $stmtBuscarIngrediente = $this->conn->prepare(
                        "SELECT id_ingrediente FROM ingredientes WHERE nombre_ingrediente = ?"
                    );
                    echo "<script>console.log('" . json_encode($ingrediente) ."')</script>";
                    $stmtBuscarIngrediente->bind_param("s", $ingrediente['nombre']);
                    $stmtBuscarIngrediente->execute();
                    $result = $stmtBuscarIngrediente->get_result();
        
                    if ($result->num_rows > 0) {
                        // Si existe, recuperar el ID
                        $row = $result->fetch_assoc();
                        $idIngrediente = $row['id_ingrediente'];
                    } else {
                        // Si no existe, insertar y obtener el ID
                        $stmtIngrediente->bind_param("s", $ingrediente['nombre']);
                        $stmtIngrediente->execute();
                        $idIngrediente = $this->conn->insert_id;
                    }
        
                    // Insertar en la tabla `receta_ingredientes`
                    $stmtRecetaIngrediente->bind_param("iii", $idReceta, $idIngrediente, $ingrediente['cantidad']);
                    $stmtRecetaIngrediente->execute();
                }
        
                // Confirmar la transacción
                $this->conn->commit();
                echo "<p>Receta añadida correctamente.</p>";
        
                // Limpiar las variables de sesión
                unset($_SESSION['instrucciones']);
                unset($_SESSION['ingredientes']);
            } catch (Exception $e) {
                // Revertir la transacción en caso de error
                $this->conn->rollback();
                echo "<p>Error al añadir la receta: " . $e->getMessage() . "</p>";
            }
        }

        public function mostrarRecetas(){
            // Consulta para obtener las recetas con sus categorías
            $sql = "SELECT r.id_receta, r.nombre_receta, c.nomre_categoria 
                    FROM receta r 
                    INNER JOIN categoria c ON r.id_categoria = c.id_categoria";
        
            $result = $this->conn->query($sql);
        
            if ($result->num_rows > 0) {
                // Recorre cada receta
                while ($receta = $result->fetch_assoc()) {
                    echo "<h3>Receta: " . $receta['nombre_receta'] . "</h3>";
                    echo "<p>Categoría: " . $receta['nomre_categoria'] . "</p>";
        
                    // Obtener ingredientes de la receta
                    $sqlIngredientes = "SELECT i.nombre_ingrediente, ri.cantidad 
                                        FROM receta_ingredientes ri 
                                        INNER JOIN ingredientes i ON ri.id_ingrediente = i.id_ingrediente 
                                        WHERE ri.id_receta = " . $receta['id_receta'];
                    $ingredientes = $this->conn->query($sqlIngredientes);
        
                    if ($ingredientes->num_rows > 0) {
                        echo "<h4>Ingredientes:</h4><ul>";
                        while ($ingrediente = $ingredientes->fetch_assoc()) {
                            echo "<li>" . $ingrediente['nombre_ingrediente'] . " - " . $ingrediente['cantidad'] . "</li>";
                        }
                        echo "</ul>";
                    } else {
                        echo "<p>No hay ingredientes asociados.</p>";
                    }
        
                    // Obtener instrucciones de la receta
                    $sqlInstrucciones = "SELECT orden, descripción 
                                         FROM instrucciones 
                                         WHERE id_receta = " . $receta['id_receta'] . " 
                                         ORDER BY orden ASC";
                    $instrucciones = $this->conn->query($sqlInstrucciones);
        
                    if ($instrucciones->num_rows > 0) {
                        echo "<h4>Instrucciones:</h4><ol>";
                        while ($instruccion = $instrucciones->fetch_assoc()) {
                            echo "<li>" . $instruccion['descripción'] . "</li>";
                        }
                        echo "</ol>";
                    } else {
                        echo "<p>No hay instrucciones asociadas.</p>";
                    }
        
                    echo "<hr>";
                }
            } else {
                echo "<p>No hay recetas registradas.</p>";
            }
        }
    }

    

    $receta = new Receta();
?>

<!DOCTYPE HTML>

<html lang="es">
<head>
    <!-- Datos que describen el documento -->
    <meta charset="UTF-8" />
    <title>F1 Desktop juegos</title>
    <meta name="description" content="juegos"/>
    <meta name="keywords" content="juegos"/>
    <meta name ="viewport" content ="width=device-width, initial-scale=1.0" />
    <meta name="author" content="Carolina Barrios Gonzalez"/>
    <link rel="stylesheet" type="text/css" href="../estilo/estilo.css" />
    <link rel="stylesheet" type="text/css" href="../estilo/layout.css" />
    <link rel="icon" href="../multimedia/imagenes/favicon.ico"/>
   
</head>

<body>
    <!-- Datos con el contenidos que aparece en el navegador -->
    <header>
        <h1><a href="index.html" title="inicio">F1 Desktop</a></h1>
        <nav>
            <a href="../index.html" accesskey="i" tabindex="1" title="inicio">Inicio</a>
            <a href="../piloto.html" accesskey="p" tabindex="2" title="piloto">Piloto</a>
            <a href="../noticias.html" accesskey="n" tabindex="3" title="noticias">Noticias</a>
            <a href="../calendario.html" accesskey="c" tabindex="4" title="calendario">Calendario</a>
            <a href="../meteorologia.html" accesskey="m" tabindex="5" title="meteorologia">Meteorologia</a>
            <a href="../circuito.html" accesskey="r" tabindex="6" title="circuito">Cirtuito</a>
            <a href="../viajes.php" accesskey="v" tabindex="7" title="viajes">Viajes</a>
            <a href="../juegos.html" accesskey="j" tabindex="8" title="juegos">Juegos</a>
        </nav>
    </header>
    <p>Estás en: <a href="index.html" title="inicio">Inicio</a> >> <a href="juegos.html" title="juegos">Juegos</a> >> Recetario</p>
    <h2>Recetario</h2>
    <nav>
        <a href="../memoria.html" accesskey="e" tabindex="1">Memoria</a>
        <a href="../semaforo.php" accesskey="s" tabindex="2">Semáforo</a>
        <a href="recetario.php" accesskey="s" tabindex="2">Recetario</a>
    </nav>
    <main>
        <h4>Añadir receta</h4>
        <form method="post" action="recetario.php">
            <label for="ingredientes">Ingrediente:</label>
            <input type="text" name="ingrediente" id="ingrediente" required>
            <label for="cantidad">Cantidad:</label>
            <input type="number" name="cantidad" id="cantidad" required>
            <input type="submit" name="addIngrediente" value="Añadir ingrediente">
            <?php
                if(count($_POST)>0 && isset($_POST['addIngrediente']) && !empty($_POST['ingrediente']) && !empty($_POST['cantidad'])){
                    $receta->addIngrediente($_POST["ingrediente"], $_POST["cantidad"]);                        
                }
                $receta->getIngredientes();
            ?>
            
        </form>
        <form method="post" action="recetario.php">
            <label for="instruccion">Instrucciones:</label>
            <input type="text" name="instruccion" id="instruccion" required>
            <input type="submit" name="addInstruccion" value="Añadir instrucción">
            <?php
                if(count($_POST)>0 && isset($_POST['addInstruccion']) && !empty($_POST['instruccion'])){
                    $receta->addInstruccion($_POST["instruccion"]);
                }
                $receta->getIntrucciones();
            ?>
        </form>
        <form method="post" action="recetario.php">
            <section>
                <label>Nombre: </label>
                <input type="text" name="nombre"/>
            </section>
            <section>
                <label>Categoría: </label>
                <select name="categoria" size="4">
                    <?php
                        $receta->getCategorias();
                    ?>
                </select>
            </section>
            <input type="submit" name="terminar" value="Añadir receta">
            <?php
                if(count($_POST)>0 && isset($_POST['terminar'])){
                    $receta->añadirReceta($_POST["nombre"], $_POST["categoria"]);
                }
            ?>
        </form>

        <form method="post" action="recetario.php">
            <input type="submit" name="mostrarRecetas" value="Mostrar todas las recetas">
            <?php
                if (count($_POST) > 0 && isset($_POST['mostrarRecetas'])) {
                    $receta->mostrarRecetas();
                }
            ?>
        </form>
    </main>
    
</body>
</html>