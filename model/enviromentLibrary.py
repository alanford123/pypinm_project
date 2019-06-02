from model.enviroment import Enviroment


class EnviromentLibrary:
    # This object will keep track of all the enviroment objects

    library = {}  # This will contain all the enviroments

    def __init__(self, sid):
        # constructor (for later)
        self.sid = sid
        return

    def createEnviroment(self, id):
        self.library[id] = Enviroment()

    def updateEnviroment(self, id, settings):
        print(f'Updating enviroment id: {id}')
        self.library[id].setGrav(float(settings['g0']))
        self.library[id].setDensity(settings['density'])
        self.library[id].setDiam(float(settings['diam']))
        self.library[id].setPressure(float(settings['pressure']))
        self.library[id].setHeight(float(settings['height']))
        
    def startCalculation(self, id):
        return self.library[id].startCalculation()