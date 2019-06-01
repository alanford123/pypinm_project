from model.calculation import initCalculation
from model.helperFunctions import returnMass, returnRho

import numpy as np


class Enviroment:
    g0 = 9.81  # Gravitational acceleration [m/s^2]
    m = 5  # Mass of object [kg]
    height = 10  # Height of tower [m]    ##SET BY CLIENT
    samples = 500  # Number of points (resolution) [/]
    duration = 50  # Duration of calculation [s]
    diam = 0.2  # Diameter of spehere [m]    ##SET BY CLIENT
    rho = 7874  # Density [kg/m^3]
    rho_air = 0.95  # Density of air [kg/m^3]
    pressure = 1  # Air pressure [bar]   ##SET BY CLIENT
    # Points for sampling @TODO: does this need a +1 on number of samples?
    y_points, y_step = np.linspace(0, duration, samples, retstep=True)

    def __init__(self):
        # constructor (for later)
        return

    def setGrav(self, g0):
        print(f'Setting gravity to: {g0}')
        self.g0 = float(g0)

    def setMass(self, m):
        # DEPRECATED
        print(f'Setting mass to: {m}')
        self.m = float(m)

    def setDiam(self, diam):
        print(f'Setting diam to: {diam}')
        self.diam = float(diam)
        self.setMass(returnMass(diam, self.rho))

    def setAirRho(self, pressure):
        print(f'Setting air rho to: {returnRho(pressure)}')
        self.rho_air = returnRho(pressure)

    def setPressure(self, pressure):
        print(f'Setting pressure to: {pressure}')
        self.pressure = pressure
        self.setAirRho(pressure)

    def setHeight(self, height):
        print(f'Setting height to: {height}')
        self.height = height

    def startCalculation(self):
        d = {
            "m": self.m,
            "rho_air_value": self.rho_air,
            "y_points": self.y_points,
            "diam": self.diam,
            "height": self.height
        }
        return initCalculation(**d)
