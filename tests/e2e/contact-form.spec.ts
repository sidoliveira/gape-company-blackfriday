import { test, expect } from '@playwright/test'

test.describe('Contact Form', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
    // Scroll to form section
    await page.locator('#contact-form').scrollIntoViewIfNeeded()
  })

  test('should display the contact form', async ({ page }) => {
    // Check if form is visible
    await expect(page.locator('form')).toBeVisible()
    
    // Check required fields
    await expect(page.locator('input[id="name"]')).toBeVisible()
    await expect(page.locator('input[id="email"]')).toBeVisible()
    await expect(page.locator('input[type="checkbox"]')).toBeVisible()
    
    // Check submit button
    await expect(page.locator('button[type="submit"]')).toBeVisible()
    await expect(page.locator('button[type="submit"]')).toContainText(/agendar|consultoria/i)
  })

  test('should show validation errors for empty required fields', async ({ page }) => {
    // Try to submit empty form
    await page.locator('button[type="submit"]').click()
    
    // Check for validation errors
    await expect(page.locator('text=Nome é obrigatório')).toBeVisible()
    await expect(page.locator('text=E-mail é obrigatório')).toBeVisible()
    await expect(page.locator('text=Você deve aceitar os termos')).toBeVisible()
  })

  test('should validate email format', async ({ page }) => {
    // Fill invalid email
    await page.locator('input[id="email"]').fill('invalid-email')
    await page.locator('button[type="submit"]').click()
    
    // Check for email validation error
    await expect(page.locator('text=E-mail inválido')).toBeVisible()
  })

  test('should successfully submit valid form', async ({ page }) => {
    // Fill required fields
    await page.locator('input[id="name"]').fill('João Silva')
    await page.locator('input[id="email"]').fill('joao@teste.com')
    await page.locator('input[type="checkbox"]').check()
    
    // Fill optional fields
    await page.locator('input[id="whatsapp"]').fill('(11) 99999-9999')
    await page.locator('input[id="website"]').fill('https://meusite.com.br')
    await page.locator('input[id="segment"]').fill('Moda')
    await page.locator('select[id="revenue"]').selectOption('R$ 100mil - R$ 500mil')
    
    // Mock the API response
    await page.route('/api/lead', async route => {
      await route.fulfill({
        status: 201,
        contentType: 'application/json',
        body: JSON.stringify({ message: 'Lead cadastrado com sucesso!', id: '123' })
      })
    })
    
    // Submit form
    await page.locator('button[type="submit"]').click()
    
    // Check for success message
    await expect(page.locator('text=Formulário enviado com sucesso')).toBeVisible()
  })

  test('should handle API errors gracefully', async ({ page }) => {
    // Fill required fields
    await page.locator('input[id="name"]').fill('João Silva')
    await page.locator('input[id="email"]').fill('joao@teste.com')
    await page.locator('input[type="checkbox"]').check()
    
    // Mock API error response
    await page.route('/api/lead', async route => {
      await route.fulfill({
        status: 500,
        contentType: 'application/json',
        body: JSON.stringify({ error: 'Erro interno do servidor' })
      })
    })
    
    // Submit form
    await page.locator('button[type="submit"]').click()
    
    // Check for error message
    await expect(page.locator('text=Erro ao enviar formulário')).toBeVisible()
  })

  test('should handle duplicate email error', async ({ page }) => {
    // Fill required fields
    await page.locator('input[id="name"]').fill('João Silva')
    await page.locator('input[id="email"]').fill('joao@teste.com')
    await page.locator('input[type="checkbox"]').check()
    
    // Mock duplicate email error
    await page.route('/api/lead', async route => {
      await route.fulfill({
        status: 409,
        contentType: 'application/json',
        body: JSON.stringify({ error: 'Este e-mail já foi cadastrado.' })
      })
    })
    
    // Submit form
    await page.locator('button[type="submit"]').click()
    
    // Check for duplicate email message
    await expect(page.locator('text=Este e-mail já foi cadastrado')).toBeVisible()
  })

  test('should show loading state during submission', async ({ page }) => {
    // Fill required fields
    await page.locator('input[id="name"]').fill('João Silva')
    await page.locator('input[id="email"]').fill('joao@teste.com')
    await page.locator('input[type="checkbox"]').check()
    
    // Mock slow API response
    await page.route('/api/lead', async route => {
      await new Promise(resolve => setTimeout(resolve, 1000))
      await route.fulfill({
        status: 201,
        contentType: 'application/json',
        body: JSON.stringify({ message: 'Lead cadastrado com sucesso!' })
      })
    })
    
    // Submit form
    await page.locator('button[type="submit"]').click()
    
    // Check for loading state
    await expect(page.locator('text=Enviando...')).toBeVisible()
    await expect(page.locator('button[type="submit"]')).toBeDisabled()
  })

  test('should clear validation errors when user starts typing', async ({ page }) => {
    // Submit empty form to trigger validation
    await page.locator('button[type="submit"]').click()
    
    // Verify error is shown
    await expect(page.locator('text=Nome é obrigatório')).toBeVisible()
    
    // Start typing in name field
    await page.locator('input[id="name"]').fill('J')
    
    // Error should be cleared
    await expect(page.locator('text=Nome é obrigatório')).not.toBeVisible()
  })

  test('should have proper form accessibility', async ({ page }) => {
    // Check labels are associated with inputs
    const nameInput = page.locator('input[id="name"]')
    const nameLabel = page.locator('label[for="name"]')
    await expect(nameLabel).toBeVisible()
    
    const emailInput = page.locator('input[id="email"]')
    const emailLabel = page.locator('label[for="email"]')
    await expect(emailLabel).toBeVisible()
    
    // Check required fields are marked
    await expect(nameLabel).toContainText('*')
    await expect(emailLabel).toContainText('*')
    
    // Check form can be navigated with keyboard
    await nameInput.focus()
    await page.keyboard.press('Tab')
    await expect(emailInput).toBeFocused()
  })

  test('should work on mobile devices', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 })
    
    // Form should still be visible and functional
    await expect(page.locator('form')).toBeVisible()
    
    // Fill and submit form
    await page.locator('input[id="name"]').fill('João Silva')
    await page.locator('input[id="email"]').fill('joao@teste.com')
    await page.locator('input[type="checkbox"]').check()
    
    // Mock successful response
    await page.route('/api/lead', async route => {
      await route.fulfill({
        status: 201,
        contentType: 'application/json',
        body: JSON.stringify({ message: 'Lead cadastrado com sucesso!' })
      })
    })
    
    await page.locator('button[type="submit"]').click()
    await expect(page.locator('text=Formulário enviado com sucesso')).toBeVisible()
  })
})