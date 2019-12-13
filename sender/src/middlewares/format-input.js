import config from 'config'

export default async(ctx, next) => {
  const maxLimit = ctx.query.limit ? ctx.query.limit : config.maxLimit
  const limitInRequest = parseInt(ctx.query.limit)

  if (limitInRequest == undefined || isNaN(limitInRequest) || limitInRequest > maxLimit) {
    ctx.query.limit = maxLimit
  } else {
    ctx.query.limit = limitInRequest
  }

  const skipInRequest = parseInt(ctx.query.skip)

  if (skipInRequest == undefined || isNaN(skipInRequest)) {
    ctx.query.skip = 0
  } else {
    ctx.query.skip = skipInRequest
  }

  await next()
}
