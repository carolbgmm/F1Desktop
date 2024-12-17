import xml.etree.ElementTree as ET

def getListaCoord(archivoXML):
    try:
        arbol = ET.parse(archivoXML)
    except IOError:
        print ('No se encuentra el archivo ', archivoXML)
        exit()

    except ET.ParseError:
        print("Error procesando en el archivo XML ", archivoXML)
        exit()

    raiz = arbol.getroot()
    lista = []

    #Se extraem las coordenadas
    for tramo in raiz.findall("{http://www.uniovi.es}tramos/{http://www.uniovi.es}tramo"):
        print()
        longuitud = tramo.attrib.get("longitud")
        latitud = tramo.attrib.get("latitud")
        altitud = tramo.attrib.get("altitud")
        lista.append([longuitud, latitud, altitud])

    return lista

def getListaDesc(archivoXML):
    list = []

    try:
        tree = ET.parse(archivoXML)
    except IOError:
        print('No existe el archivo ' + archivoXML)
        exit

    except ET.ParseError:
        print('Error procesando en el archivo .xml ' + archivoXML)
        exit()

    #Añade el nombre, la localidad y el país
    root = tree.getroot()
    list.append(root.find("{http://www.uniovi.es}nombre").text)
    list.append('Circuito de ' + root.find("{http://www.uniovi.es}localidad").text +
                ', ' + root.find("{http://www.uniovi.es}pais").text)

    return list

def createKml(listaCoord, desc,output):
    try:
        file = open("./" + output + ".kml", "w")
    except FileExistsError:
        file = open("./" + output + ".kml", "x")

    file.write('<?xml version="1.0" encoding="utf-8"?>\n' +
                  '<kml xmlns="http://www.opengis.net/kml/2.2">\n')

    file.write('<Document>\n')
    #Linea de salida
    for coord in listaCoord:
        file.write('<Placemark>\n <name>Meta</name>\n <description>' + desc[0] + '</description>\n <Point>\n<coordinates>' + coord[0] + ',' + coord[1] + ',' + coord[2] + '\n'
                   + '</coordinates>\n </Point>\n</Placemark>\n')

    #Cerrar todo
    file.write('</Document>\n</kml>')
    file.close()
    print("Archivo generado correctamente")

def main():
    file = "circuitoEsquema.xml"
    listaCoord = getListaCoord(file)
    listaDesc = getListaDesc(file)
    createKml(listaCoord,listaDesc,"circuito")


if __name__ == "__main__":
    main()