import mysql from 'mysql2/promise'
import type { Pool } from 'mysql2/promise'

let pool: Pool | null = null

export function useDb() {
  if (!pool) {
    const config = useRuntimeConfig()

    pool = mysql.createPool({
      host: config.dbHost,
      port: config.dbPort,
      user: config.dbUser,
      password: config.dbPassword,
      database: config.dbName,
      waitForConnections: true,
      connectionLimit: 10,
    })
  }

  return pool
}
