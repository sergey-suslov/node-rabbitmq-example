import Router from 'koa-router'
import publicApi from './public'

const router = new Router()
router.use(publicApi.routes(), publicApi.allowedMethods())

export default router
