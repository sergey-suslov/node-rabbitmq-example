import Koa from 'koa'
import koaBody from 'koa-body'
import session from 'koa-session'
import logger from './logger'
import errorHandler from './middlewares/error-handler'
import logRequest from './middlewares/log-request'
import formatInput from './middlewares/format-input'
import routes from './routes'

const app = new Koa()
app.context.log = logger

app.keys = [process.env.SESSION_SECRET]

const CONFIG = {
  maxAge: 86400000
}

// app.use(session(CONFIG, app))
app.use(koaBody())
app.use(errorHandler)
app.use(logRequest)
app.use(formatInput)
app.use(routes.routes(), routes.allowedMethods())
app.on('error', () => {})

app.listen(process.env.PORT || 8080)
