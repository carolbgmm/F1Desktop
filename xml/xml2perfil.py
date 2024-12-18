import xml.etree.ElementTree as ET

def getListaAltitud(archivoXML):
    try:
        tree = ET.parse(archivoXML)
    except IOError:
        print('No existe el archivo ' + archivoXML)
        exit

    except ET.ParseError:
        print('Error procesando en el archivo .xml ' + archivoXML)
        exit()

    raiz = tree.getroot()
    lista = []

    for tramo in raiz.findall("{http://www.uniovi.es}tramos/{http://www.uniovi.es}tramo"):
        nsector = tramo.attrib.get("sector")
        altitud = tramo.attrib.get("altitud")
        lista.append([nsector, altitud])

    return lista

def createSvgPerfil(archivoXML, output):
    try:
        svgFile = open("./" + output + ".svg", "w")
    except FileExistsError:
        svgFile = open("./" + output + ".svg", "x")

    svgFile.write('<?xml version="1.0" encoding="utf-8"?>\n' +
                  '<svg xmlns="http://www.w3.org/2000/svg" version="2.0">\n')
    svgFile.write('<polyline points = "\n')

    base = 150
    init = 0
    separacion = 10

    svgFile.write(str(init) + ', ' + str(base) + '\n')

    incr = 0
    for element in archivoXML:
        incr += 1
        svgFile.write(str(separacion*incr) + ',' + str(base-float(element[1])) + '\n')

    svgFile.write((str(separacion*incr)) + ', ' + str(base) + '\n')
    svgFile.write(str(init-1.5) + ', ' + str(base) + '\n')

    svgFile.write('"\nstyle="fill:white;stroke:orange;stroke-width:4" />\n')

    svgFile.write('</svg>')
    print("Archivo generado correctamente")



def main():
    createSvgPerfil(getListaAltitud("circuitoEsquema.xml"),
                    "altimetria")

if __name__ == "__main__":
    main()