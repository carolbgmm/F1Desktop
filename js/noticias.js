class Noticias{
    constructor(){
        if (window.File && window.FileReader && window.FileList && window.Blob) {  
            //El navegador soporta el API File
            document.write("<p>Este navegador soporta el API File </p>");
        } else document.write("<p>¡¡¡ Este navegador NO soporta el API File y este programa puede no funcionar correctamente !!!</p>");
    }

    readInputFile(files){
        var archivo = files[0];
        var tipoTexto = /text.*/;
        if(archivo.type.match(tipoTexto)){
       
            var lector = new FileReader();
            lector.onload = function (evento) {
                var readString = lector.result;
                var noticias = readString.split("\n");
                
                noticias.forEach(element => {
                    var noticia = element.split("_");

                    var article = $("<article></article>");
                    var titulo = $("<h3></h3>").text(noticia[0]);
                    var entradilla = $("<h4></h4>").text(noticia[1]);
                    var texto = $("<p></p>").text(noticia[2]);
                    var autor = $("<p></p>").text("Autor: " + noticia[3]);

                    article.append(titulo);
                    article.append(entradilla);
                    article.append(texto);
                    article.append(autor);
                    $("main section").first().append(article);
                })
            };    
            lector.readAsText(archivo);
        } else {
            document.write("<p>Error: archivo no válido</p>");
        }
        
    }

    addNoticia(){
        var fields = document.querySelectorAll('textarea');
        var article = $("<article></article>");
        var titulo = $("<h3></h3>").text(fields[0].value);
        fields[0].value = "";
        var entradilla = $("<h4></h4>").text(fields[1].value);
        fields[1].value = "";
        var texto = $("<p></p>").text(fields[2].value);
        var autor = $("<p></p>").text("Autor: " + fields[3].value);

        article.append(titulo);
        article.append(entradilla);
        article.append(texto);
        article.append(autor);
        $("main section").first().append(article);
    }
}

var noticias = new Noticias();