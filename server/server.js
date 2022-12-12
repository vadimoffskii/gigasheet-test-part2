const express = require('express')
const axios = require("axios")
const cors = require("cors")
const { createClient } = require('redis')
//Constants
const PORT = process.env.PORT || 5000
const DEFAULT_EXPIRATION = 3600
const BASE_URL = 'https://host.io/api/web/'
const TOKEN = '9dd57a5b4d34c8'
//Express
const app = express()
app.use(express.urlencoded({ extended: true }))
app.use(cors())
//Redis
const redisClient = createClient({
  port: 6379,
  host: 'localhost'
});
redisClient.on('connect', () => console.log('Connected to REDIS!'));
redisClient.on('error', (err) => console.log('Error connecting to REDIS: ', err));
(async () => { await redisClient.connect() })()
//Endpoints
const getDomainsDetail = async (req, res) => {
  const domain_name = req.params?.domain
  try {
    if (!domain_name) return res.json({ message: `Domain name has not been added` })
    const domain_data = await redisClient.get(`domain:${domain_name}`)
    if (domain_data) return res.json(JSON.parse(domain_data))
    const { data } = await axios.get(`${BASE_URL}${domain_name}?token=${TOKEN}`)
    await redisClient.SETEX(`domain:${domain_name}`, DEFAULT_EXPIRATION, JSON.stringify(data))
    res.json(data)
  } catch (err) {
    res.json({ message: `No details found for ${domain_name}` })
  }
}
app.get(`/:domain`, getDomainsDetail)
//Port
app.listen(PORT, () => { console.log(`Server started on http://localhost:${PORT}`) })