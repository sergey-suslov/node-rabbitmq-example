import rabbit from './rabbit'

rabbit.getInstance()
  .then(broker => {
    broker.subscribe('test', (msg, ack) => {
      console.log('Message:', msg.content.toString())
      ack()
    })
  })
