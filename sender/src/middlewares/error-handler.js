import Boom from 'boom'

export default async(ctx, next) => {
  try {
    await next()
  } catch (err) {
    if (err) {
      if (err.isBoom) {
        ctx.status = err.output.statusCode
        ctx.set({
          ...ctx.response.headers,
          ...err.output.headers
        })
        ctx.body = {
          ...err.output.payload,
          data: err.data
        }
      } else {
        ctx.log.error(err)
        ctx.status = err.status || 500
        ctx.body = Boom.boomify(err, { statusCode: err.status, message: err.message })
          .output
          .payload
      }
      ctx.app.emit('error', err, ctx)
      return
    }
    ctx.log.error(err)
    const { output: internalErrorOutput } = Boom.internal('Something went wrong')
    ctx.status = internalErrorOutput.statusCode
    ctx.body = internalErrorOutput.payload
  }
}
