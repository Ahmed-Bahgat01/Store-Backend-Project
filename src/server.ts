import app from './index'

const address: string = '0.0.0.0:3000'
const PORT = process.env.PORT || 3000

app.listen(PORT, function() {
  console.log(`starting app on: ${address}`)
})
