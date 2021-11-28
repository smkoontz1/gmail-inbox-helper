import express from 'express'
import cors from 'cors'

const app = express()
const port = 3002
const whitelist = ['http://localhost:3000']

app.use(cors({
  origin: (origin, callback) => {
    // allow requests with no origin 
    if(!origin) return callback(null, true)
    if(whitelist.indexOf(origin) === -1){
      var message = 'The CORS policy for this origin doesn\'t ' +
                'allow access from the particular origin.';
      return callback(new Error(message), false);
    }
    return callback(null, true);
  }
}));

app.get('/', (req, res) => {
  res.send('Hello World')
})

app.listen(port, () => {
  console.log(`Express server listening at http://localhost:${port}`)
})