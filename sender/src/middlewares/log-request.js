export default async(ctx, next) => {
  ctx.log.trace(`[${ctx.method}] - ${ctx.url}`)
  await next()
}
