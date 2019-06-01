from aiohttp import web
from model.enviroment import Enviroment
import socketio


sio = socketio.AsyncServer()
app = web.Application()
sio.attach(app)
env = Enviroment()


async def index(request):
    """Serve the client-side application."""
    with open('index.html') as f:
        return web.Response(text=f.read(), content_type='text/html')


@sio.on('connect')
def connect(sid, environ):
    print("connect ", sid)


@sio.on('settings')
async def settings(sid, message):
    env.setGrav(float(message['g0']))
    env.setDiam(float(message['diam']))
    env.setPressure(float(message['pressure']))
    env.setHeight(float(message['height']))


@sio.on('startCalculation')
async def startCalculation(sid):
    a, v, y, t = env.startCalculation()
    await sio.emit('calculationResponse', {'a': a.tolist(),
                                           'v': v.tolist(),
                                           'y': y.tolist(),
                                           'resultPoints' : t.tolist()}) 



@sio.on('disconnect')
def disconnect(sid):
    print('disconnect ', sid)


app.router.add_static('/static', 'static')
app.router.add_get('/', index)


def startServer():
    web.run_app(app)
