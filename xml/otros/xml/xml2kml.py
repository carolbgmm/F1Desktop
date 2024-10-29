#xml2kml.py
#Crea archivos .kml con puntos y lineas a partir de
#de un archivo .xml

#imports
import xml.etree.ElementTree as ET

def parseXmlCoordinates(xmlFileName):
    #Lista que almacenara las coordenadas
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
    #Se lee cada tramo para extraer sus coordenadas
    for coordenada in root.findall("{http://www.uniovi.es}tramos/{http://www.uniovi.es}tramo/{http://www.uniovi.es}coordenada"):
        longuitud = coordenada.find("{http://www.uniovi.es}longitud-coord")
        latitud = coordenada.find("{http://www.uniovi.es}latitud")
        altitud = coordenada.find("{http://www.uniovi.es}altitud")
        list.append([longuitud.text, latitud.text, altitud.text])

    #se devuelve la lista de coordenadas parseadas
    return list

#Se obtiene el nombre y la descripcion de la placeMark del .kml
def parseXmlCircuitNameDescription(xmlFileName):
    #lista para guardar
    #Posicion 0 = name
    #Posicion 1= description
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
    name = root.find("{http://www.uniovi.es}name")
    localidad = root.find("{http://www.uniovi.es}localidad")
    pais = root.find("{http://www.uniovi.es}pais")

    list.append(name.text)
    list.append('Circuito situado en la localidad de ' + localidad.text + 
                ', ' + pais.text)
    #Se devuleve la lista
    return list

#Crea un un archivo .kml de lineas y puntos, usando las coordenadas
#que recibe como primer parametro
#Como segundo parametro se recibe una lista que contenfra, en su primera posicion
#el nombre y, en la segunda posicion, la descripcion del circuito 
#El nobre del archivo sera el recibido como tercer parametro
def createLinePointsKml(coordinatesList, nameAndDescription,outFileName):
    print('Parsing')
    finalParsingMsg = 'Se ha modificado el archivo ' + outFileName + '.kml con exito'
    try:
        kmlFile = open("./" + outFileName + ".kml", "w")
    except FileExistsError:
        print('No se ha encontrado un archivo con el nombre ' + outFileName + '.kml\n' +
              'Se creara un archivo')
        finalParsingMsg = 'Archivo ' + outFileName + '.kml creado con exito'
        kmlFile = open("./" + outFileName + ".kml", "x")

    #Se escribe la cabecera
    kmlFile.write('<?xml version="1.0" encoding="utf-8"?>\n' +
                  '<kml xmlns="http://www.opengis.net/kml/2.2">\n')
    #----------
    #Se abre la etiqueta document
    kmlFile.write('<Document>\n')
    #----------
    #Se añade la linea de salida mediante un la etiqueta Point
    kmlFile.write('<Placemark>\n' + 
                  '<name>Linea de meta</name>\n' +
                  '<description>' + nameAndDescription[0] + '</description>\n' +
                  '<Point>\n<coordinates>' + 
                  coordinatesList[len(coordinatesList)-1][0] + ',' + 
                  coordinatesList[len(coordinatesList)-1][1] + ',' + 
                  coordinatesList[len(coordinatesList)-1][2] + '</coordinates>\n' + 
                  '</Point>\n</Placemark>\n')
    #----------
    #Se añade el nombre de la ruta
    kmlFile.write('<name>'+ nameAndDescription[0] + '</name>\n')
    #----------
    #Se parsean las coordenadas del circuito
    #Se abren placemark y se escribe la etiqueta
    #name y description, y se abre la etiqueta LineString y coordinates
    kmlFile.write('<Placemark>\n' + 
                    '<name>' + nameAndDescription[0] + '</name>\n' + 
                    '<description>' + nameAndDescription[1] + '</description>' +
                    '<LineString>\n<coordinates>\n')
    #Se añaden las coordenadas
    for coord in coordinatesList:
        kmlFile.write(coord[0] + ',' + coord[1] + ',' + coord[2] + '\n')
    #Se cierra el circuito
    kmlFile.write(coordinatesList[0][0] + ',' + coordinatesList[0][1] + ',' + coordinatesList[0][2] + '\n')
    #Se cierran las etiquetas coordinates y lineString
    kmlFile.write('</coordinates>\n</LineString>\n')
    #Se añade el estilo de la linea mediante las etiquetas Style y LineStyle
    kmlFile.write('<Style>\n<LineStyle>\n<color>#ff0000ff</color>\n' +
                    '</LineStyle>\n</Style>\n')
    #Se  cierrena las etiquetas placemark, document y kml
    kmlFile.write('</Placemark>\n</Document>\n</kml>')
    #----------
    #Se cierra el archivo .kml
    kmlFile.close()
    #----------
    print(finalParsingMsg)

def main():
    createLinePointsKml(parseXmlCoordinates("circuitoEsquema.xml"),
                        parseXmlCircuitNameDescription("circuitoEsquema.xml"),
                        "circuito")

if __name__ == "__main__":
    main() 