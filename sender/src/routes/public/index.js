import Router from 'koa-router'
import send from './send'

const router = new Router()

router.post('/send', send.send)

export default router
