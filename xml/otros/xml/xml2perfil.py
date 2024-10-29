#xml2perfil.py
#Crea archivos .svg de la altimetria de un circuito a partir de
#de un archivo .xml

#imports
import xml.etree.ElementTree as ET

def parseXmlSectorHeights(xmlFileName):
    #Lista que almacenara la latura de cada punto y a que sector pertenece
    list = []

    #Se parsea el xml
    try:
        tree = ET.parse(xmlFileName)
    except IOError:
        print('No existe el archivo ' + xmlFileName)
        exit

    except ET.ParseError:
        print('Error procesando en el archivo .xml ' + xmlFileName)
        exit()

    root = tree.getroot()

    for tramo in root.findall("{http://www.uniovi.es}tramos/{http://www.uniovi.es}tramo"):
        sector = tramo.find("{http://www.uniovi.es}sector")
        altitud = tramo.find("{http://www.uniovi.es}coordenada/{http://www.uniovi.es}altitud")
        list.append([sector.text, altitud.text])
        
    #Se devuelve la lista con las altitudes    
    return list

def createSvgPerfil(heightsList, outFileName):
    finalParsingMsg = 'Se ha modificado el archivo ' + outFileName + '.svg con exito'
    try:
        svgFile = open("./" + outFileName + ".svg", "w")
    except FileExistsError:
        print('No se ha encontrado un archivo con el nombre ' + outFileName + '.svg\n' +
              'Se creara un archivo')
        finalParsingMsg = 'Archivo ' + outFileName + '.svg creado con exito'
        svgFile = open("./" + outFileName + ".svg", "x")

    #Se escribe la cabecera
    svgFile.write('<?xml version="1.0" encoding="utf-8"?>\n' +
                  '<svg xmlns="http://www.w3.org/2000/svg" version="2.0">\n')
    #----------
    #Se escribe el inicio de la polilinea
    svgFile.write('<polyline points = "\n')
    #----------
    #Se añaden los puntos
    heightBase = 300;
    ptoInicial = 40
    separacion = 10
    #Se añade el punto inicial
    svgFile.write(str(ptoInicial) + ', ' + str(heightBase) + '\n')
    #Se añaden los diferentes puntos
    incr = 0
    for element in heightsList:
        incr += 1
        svgFile.write(str(separacion*incr+40) + ',' + str(heightBase-float(element[1])) + '\n')
    #Se cierra la polilinea
    svgFile.write((str(separacion*incr+40)) + ', ' + str(heightBase) + '\n')
    svgFile.write(str(ptoInicial-1.5) + ', ' + str(heightBase) + '\n')
    #Se cierra la etiqueta de la polilinea
    svgFile.write('"\nstyle="fill:white;stroke:orange;stroke-width:4" />\n')
    #----------
    svgFile.write('</svg>')

    print(finalParsingMsg)

def main():
    createSvgPerfil(parseXmlSectorHeights("circuitoEsquema.xml"),
                    "altimetria")

if __name__ == "__main__":
    main() 