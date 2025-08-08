import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { createClient } from '@supabase/supabase-js'
import { headers } from 'next/headers'

// Rate limiting store (in production, use Redis or similar)
const rateLimitStore = new Map<string, { count: number; resetTime: number }>()

// Validation schema
const leadSchema = z.object({
  name: z.string().min(2, 'Nome deve ter pelo menos 2 caracteres').max(100),
  email: z.string().email('E-mail inválido').max(255),
  whatsapp: z.string().optional(),
  website: z.string().url().optional().or(z.literal('')),
  segment: z.string().optional(),
  revenueRange: z.string().optional(),
  consent: z.boolean().refine(val => val === true, 'Consentimento é obrigatório')
})

// Initialize Supabase client
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

// Rate limiting function
function checkRateLimit(ip: string): boolean {
  const now = Date.now()
  const windowMs = 15 * 60 * 1000 // 15 minutes
  const maxRequests = 5 // Max 5 requests per 15 minutes per IP
  
  const record = rateLimitStore.get(ip)
  
  if (!record || now > record.resetTime) {
    rateLimitStore.set(ip, { count: 1, resetTime: now + windowMs })
    return true
  }
  
  if (record.count >= maxRequests) {
    return false
  }
  
  record.count++
  return true
}

// Clean up expired rate limit records
function cleanupRateLimit() {
  const now = Date.now()
  Array.from(rateLimitStore.entries()).forEach(([ip, record]) => {
    if (now > record.resetTime) {
      rateLimitStore.delete(ip)
    }
  })
}

// Run cleanup every 30 minutes
setInterval(cleanupRateLimit, 30 * 60 * 1000)

export async function POST(request: NextRequest) {
  try {
    // Get client IP for rate limiting
    const headersList = headers()
    const forwarded = headersList.get('x-forwarded-for')
    const ip = forwarded ? forwarded.split(',')[0] : headersList.get('x-real-ip') || 'unknown'
    
    // Check rate limit
    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { error: 'Muitas tentativas. Tente novamente em 15 minutos.' },
        { status: 429 }
      )
    }
    
    // Parse and validate request body
    const body = await request.json()
    const validatedData = leadSchema.parse(body)
    
    // Prepare data for database
    const leadData = {
      name: validatedData.name.trim(),
      email: validatedData.email.toLowerCase().trim(),
      whatsapp: validatedData.whatsapp?.trim() || null,
      website: validatedData.website || null,
      segment: validatedData.segment?.trim() || null,
      revenue_range: validatedData.revenueRange || null,
      consent: validatedData.consent,
      ip_address: ip,
      user_agent: headersList.get('user-agent') || null,
      created_at: new Date().toISOString()
    }
    
    // Insert lead into Supabase
    const { data, error } = await supabase
      .from('leads')
      .insert([leadData])
      .select()
    
    if (error) {
      console.error('Supabase error:', error)
      
      // Check for duplicate email
      if (error.code === '23505' && error.message.includes('email')) {
        return NextResponse.json(
          { error: 'Este e-mail já foi cadastrado.' },
          { status: 409 }
        )
      }
      
      return NextResponse.json(
        { error: 'Erro interno do servidor. Tente novamente.' },
        { status: 500 }
      )
    }
    
    // Success response
    return NextResponse.json(
      { 
        message: 'Lead cadastrado com sucesso!',
        id: data[0]?.id
      },
      { status: 201 }
    )
    
  } catch (error) {
    console.error('API error:', error)
    
    // Validation errors
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { 
          error: 'Dados inválidos',
          details: error.errors.map(err => ({
            field: err.path.join('.'),
            message: err.message
          }))
        },
        { status: 400 }
      )
    }
    
    // JSON parsing errors
    if (error instanceof SyntaxError) {
      return NextResponse.json(
        { error: 'Formato de dados inválido' },
        { status: 400 }
      )
    }
    
    // Generic error
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    )
  }
}

// Health check endpoint
export async function GET() {
  try {
    // Test Supabase connection
    const { error } = await supabase
      .from('leads')
      .select('count')
      .limit(1)
    
    if (error) {
      throw error
    }
    
    return NextResponse.json(
      { 
        status: 'healthy',
        timestamp: new Date().toISOString()
      },
      { status: 200 }
    )
  } catch (error) {
    console.error('Health check failed:', error)
    return NextResponse.json(
      { 
        status: 'unhealthy',
        error: 'Database connection failed'
      },
      { status: 503 }
    )
  }
}