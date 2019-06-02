import numpy as np

def returnK(v, rho, d, mu):
    # Konstante izračuna Cd ( https://www.researchgate.net/publication/244155878 )
    A=0.1806
    B=0.6459
    C=0.4251
    D=6880.95
    
    # Izračun Cd vključuje deljenje z hitrostjo. Ker je pri začetnem pogoju le-ta enaka 0 ji prištejemo nekaj zelo majhnega.   
    Re = d*v*rho/mu+0.000000001
    Cd = 24/Re*(1+A*Re**B)+C/(1+D/Re)
     #Izračun konstante
    k = ((np.pi*(d/2)**2)*Cd*rho)/2
    return k

def returnMass(diam, rho):
    return rho*(4/3)*np.pi*(diam/2)**3

def returnRho(p):
    return ((28.96/1000)*p*10**5)/(8.3144598*(20+273.15)) 