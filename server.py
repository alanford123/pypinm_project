from aiohttp import web
from model.enviromentLibrary import EnviromentLibrary
import socketio

#Init server 
sio = socketio.AsyncServer()
app = web.Application()
sio.attach(app)

#List of connected clients
clients = {}

async def index(request):
    """Serve the client-side application."""
    with open('index.html') as f:
        return web.Response(text=f.read(), content_type='text/html')


@sio.on('connect')
def connect(sid, environ):
    print("Connected ", sid)
    clients[sid] = EnviromentLibrary(sid)


@sio.on('settings')
async def settings(sid, message):
    #Message packet contains object with ID and Settings 
    clients[sid].updateEnviroment(message['id'], message['data'])


@sio.on('createEnviroment')
async def createEnviroment(sid, message):
    print("Creating enviroment: ", message['id'])
    clients[sid].createEnviroment(message['id'])


@sio.on('startCalculation')
async def startCalculation(sid, message):
    a, v, y, t = clients[sid].startCalculation(message['id'])
    await sio.emit('calculationResponse', {'a': a.tolist(),
                                           'v': v.tolist(),
                                           'y': y.tolist(),
                                           'resultPoints': t.tolist()})


@sio.on('disconnect')
def disconnect(sid):
    print('disconnect ', sid)


app.router.add_static('/static', 'static')
app.router.add_get('/', index)


def startServer():
    web.run_app(app)
