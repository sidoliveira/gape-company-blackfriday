import { test, expect } from '@playwright/test'

test.describe('Landing Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  })

  test('should load the landing page successfully', async ({ page }) => {
    // Check if the page loads
    await expect(page).toHaveTitle(/Gape Company/)
    
    // Check if main sections are visible
    await expect(page.locator('section').first()).toBeVisible()
  })

  test('should display hero section with correct content', async ({ page }) => {
    // Check hero headline
    await expect(page.locator('h1')).toBeVisible()
    await expect(page.locator('h1')).toContainText(/E-commerce/i)
    
    // Check CTA buttons
    await expect(page.locator('button, a').filter({ hasText: /falar|contato|consultoria/i }).first()).toBeVisible()
    
    // Check metrics
    await expect(page.locator('text=150')).toBeVisible()
    await expect(page.locator('text=80 milhões')).toBeVisible()
  })

  test('should display all main sections', async ({ page }) => {
    // Hero section
    await expect(page.locator('section').first()).toBeVisible()
    
    // Logos section
    await expect(page.locator('text=/confiada por/i')).toBeVisible()
    
    // Pillars section
    await expect(page.locator('text=/estratégia/i')).toBeVisible()
    
    // Testimonials section
    await expect(page.locator('text=/depoimento/i')).toBeVisible()
    
    // CTA form section
    await expect(page.locator('form')).toBeVisible()
    
    // Footer
    await expect(page.locator('footer')).toBeVisible()
  })

  test('should have working navigation links', async ({ page }) => {
    // Test anchor links
    const links = page.locator('a[href^="#"]')
    const count = await links.count()
    
    if (count > 0) {
      const firstLink = links.first()
      await firstLink.click()
      // Should not navigate away from the page
      await expect(page).toHaveURL(/\/#/)
    }
  })

  test('should be responsive on mobile', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 })
    
    // Check if main elements are still visible
    await expect(page.locator('h1')).toBeVisible()
    await expect(page.locator('form')).toBeVisible()
    await expect(page.locator('footer')).toBeVisible()
  })

  test('should have proper SEO meta tags', async ({ page }) => {
    // Check title
    await expect(page).toHaveTitle(/Gape Company/)
    
    // Check meta description
    const metaDescription = page.locator('meta[name="description"]')
    await expect(metaDescription).toHaveAttribute('content', /.+/)
    
    // Check Open Graph tags
    const ogTitle = page.locator('meta[property="og:title"]')
    await expect(ogTitle).toHaveAttribute('content', /.+/)
    
    const ogDescription = page.locator('meta[property="og:description"]')
    await expect(ogDescription).toHaveAttribute('content', /.+/)
  })

  test('should load without accessibility violations', async ({ page }) => {
    // Check for basic accessibility
    const h1Count = await page.locator('h1').count()
    expect(h1Count).toBe(1) // Should have exactly one h1
    
    // Check for alt text on images
    const images = page.locator('img')
    const imageCount = await images.count()
    
    for (let i = 0; i < imageCount; i++) {
      const img = images.nth(i)
      const alt = await img.getAttribute('alt')
      expect(alt).toBeTruthy() // All images should have alt text
    }
  })

  test('should have working external links', async ({ page }) => {
    // Check social media links in footer
    const socialLinks = page.locator('footer a[target="_blank"]')
    const count = await socialLinks.count()
    
    for (let i = 0; i < count; i++) {
      const link = socialLinks.nth(i)
      await expect(link).toHaveAttribute('rel', 'noopener noreferrer')
      await expect(link).toHaveAttribute('href', /^https?:\/\//)
    }
  })
})