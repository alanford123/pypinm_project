from model.calculation import initCalculation
from model.calculation import returnMass
import numpy as np

class Enviroment:
    g0 = 9.81 #Gravitational acceleration [m/s^2]
    m = 5 #Mass of object [kg]
    height = 10 #Height of tower [m]
    samples = 50 #Number of points (resolution) [/]
    duration = 10 #Duration of calculation [s]
    diam = 0.2 #Diameter of spehere [m]
    rho = 7874 #Density [kg/m^3]
    y_points,y_step = np.linspace(0,duration,samples,retstep=True) #Points for sampling @TODO: does this need a +1 on number of samples?

    def __init__(self):
        #constructor (for later)
        return
    
    def setGrav(self, g0):
        print(f'Setting gravity to: {g0}')
        self.g0 = float(g0)

    def setMass(self,m):
        #DEPRECATED
        print(f'Setting mass to: {m}')
        self.m = float(m)

    def setDiam(self, diam):
        print(f'Setting diam to: {diam}')
        self.diam = float(diam)
        self.m = returnMass(diam)

    def startCalculation(self):
        return initCalculation(m=self.m,g0=self.g0,height=self.height,y_points=self.y_points,y_step=self.y_step)