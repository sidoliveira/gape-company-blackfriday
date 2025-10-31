import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

// Evita pré-render e garante execução dinâmica no servidor
export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    const startTime = Date.now()
    let dbStatus: 'healthy' | 'unhealthy' | 'skipped' = 'skipped'

    // Lê variáveis de ambiente em tempo de execução (não no topo do módulo)
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

    if (supabaseUrl && supabaseKey) {
      const supabase = createClient(supabaseUrl, supabaseKey)
      // Teste leve no banco (HEAD-like): conta sem retornar linhas
      const { error } = await supabase
        .from('leads')
        .select('*', { count: 'exact', head: true })
        .limit(1)
      if (error) {
        dbStatus = 'unhealthy'
      } else {
        dbStatus = 'healthy'
      }
    }
    
    const responseTime = Date.now() - startTime
    
    return NextResponse.json(
      { 
        status: 'healthy',
        timestamp: new Date().toISOString(),
        services: {
          database: dbStatus,
          api: 'healthy'
        },
        responseTime: `${responseTime}ms`,
        version: process.env.npm_package_version || '1.0.0'
      },
      { status: 200 }
    )
  } catch (error) {
    console.error('Health check failed:', error)
    
    return NextResponse.json(
      { 
        status: 'unhealthy',
        timestamp: new Date().toISOString(),
        services: {
          database: 'unhealthy',
          api: 'healthy'
        },
        error: 'Database connection failed'
      },
      { status: 503 }
    )
  }
}