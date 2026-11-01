const express = require('express')

const app = express()
const PORT = 5001

// Allow the React development server to call this backend.
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5173')
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')

  if (req.method === 'OPTIONS') {
    return res.sendStatus(204)
  }

  next()
})

// Middleware to read JSON data
app.use(express.json())

// Test API route
app.get('/', (req, res) => {
  res.send('Analog Clock Backend is Running!')
})

// Health-check API
app.get('/api/health', (req, res) => {
  res.json({
    success: true,
    message: 'Backend API is working successfully',
    project: 'Analog Clock'
  })
})

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`)
})
