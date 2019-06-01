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
    env.setGrav(message['g0'])
    env.setMass(message['m'])

@sio.on('startCalculation')
async def startCalculation(sid):
    result = env.startCalculation()
    print(result)
    await sio.emit('calculationResponse', {'data': result.tolist()})



@sio.on('disconnect')
def disconnect(sid):
    print('disconnect ', sid)


app.router.add_static('/static', 'static')
app.router.add_get('/', index)


def startServer():
        web.run_app(app)