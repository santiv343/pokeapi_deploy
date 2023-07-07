const { Pool } = require('pg')
require('dotenv').config()

const pool = new Pool({
    connectionString: "postgres://default:bsE0UIfowF6O@ep-withered-salad-325579-pooler.us-east-1.postgres.vercel-storage.com:5432/verceldb?sslmode=require",
})