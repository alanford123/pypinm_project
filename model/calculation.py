import numpy as np
from scipy import integrate
from scipy.integrate import solve_ivp


def fun(x, y, g=9.81, m=30, d=0.1, rho=1.18/1000, mu=0.0000157):
    k = returnK(v = y[1], rho = rho, d = d, mu = mu, m = m)
    #Vrnjen vektor
    return np.array([y[1], g-k/m*y[1]**2])

def returnK(v, rho, d, mu, m):
    # Konstante izračuna Cd ( https://www.researchgate.net/publication/244155878 )
    A=0.1806
    B=0.6459
    C=0.4251
    D=6880.95
    
    # Izračun Cd vključuje deljenje z hitrostjo. Ker je pri začetnem pogoju le-ta enaka 0 ji prištejemo nekaj zelo majhnega.   
    Re = d*v*rho/mu+0.000000001
    Cd = 24/Re*(1+A*Re**B)+C/(1+D/Re)
     #Izračun konstante
    k = (((d/2)**2)*Cd*rho*v**2)/2
    return k

def returnMass(diam):
    




def initCalculation(m,g0,height,y_points,y_step):
    print('starting calculation')
    return getTranslationArray(g0,m,y_points,y_step)

def getTranslationArray(g0,m,y_points,y_step):
    return integrate.cumtrapz(y=getSpeedArray(y_points,m,g0), dx=y_step, initial=0)


def euler(f, t, y0, *args, **kwargs):
    ##FROM pypinm
    """
    Eulerjeva metoda za reševanje sistema diferencialnih enačb: y' = f(t, y)
    
    :param f:  funkcija, ki vrne prvi odvod - f(t, y)
    :param t:  časovni vektor kjer računamo rešitev
    :param y0: začetna vrednosti
    :param args: dodatni argumenti funkcije f (brezimenski)
    :param kwargs: dodatni argumenti funkcije f (poimenovani)
    :return y: vrne np.array ``y`` vrednosti funkcije.
    """
    y = np.zeros_like(t)
    y[0] = y0        
    h = t[1]-t[0]
    for i in range(len(t)-1):
        y[i+1] = y[i] + f(t[i], y[i], *args, **kwargs) * h
    return y

def f_zračni_upor(t, y, g=9.81, m=1., c=1):
    ##FROM pypinm
    return g-c*y/m

def getSpeedArray(y_points,m,g0):
    return euler(f_zračni_upor, y_points, y0=0, m=m, g=g0)
