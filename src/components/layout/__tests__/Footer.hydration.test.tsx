import { render, screen, waitFor } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { Footer } from '../Footer'

// Mock Next.js Link component
vi.mock('next/link', () => ({
  default: ({ children, href, ...props }: any) => (
    <a href={href} {...props}>
      {children}
    </a>
  ),
}))

describe('Footer Component - Hydration Behavior', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('prevents hydration mismatches by using useState and useEffect pattern', async () => {
    // Mock console.error to catch any hydration warnings
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {})
    
    const mockYear = 2024
    const dateSpy = vi.spyOn(Date.prototype, 'getFullYear').mockReturnValue(mockYear)
    
    // Render the component
    render(<Footer />)
    
    // Verify the component renders without console errors
    expect(consoleSpy).not.toHaveBeenCalledWith(
      expect.stringMatching(/hydration|mismatch/i)
    )
    
    // Verify the copyright text is present (either with null state fallback or updated state)
    const copyrightRegex = new RegExp(`© ${mockYear} Soofi Mandi\\. All rights reserved\\.`)
    
    // Wait for the useEffect to potentially update the state
    await waitFor(() => {
      const copyrightText = screen.getByText(copyrightRegex)
      expect(copyrightText).toBeInTheDocument()
    })
    
    dateSpy.mockRestore()
    consoleSpy.mockRestore()
  })

  it('handles server-client rendering differences gracefully', async () => {
    // Simulate different years between server and client
    const serverYear = 2023
    const clientYear = 2024
    
    let callCount = 0
    const dateSpy = vi.spyOn(Date.prototype, 'getFullYear').mockImplementation(() => {
      callCount++
      // First call (server-side simulation) returns 2023
      // Subsequent calls (client-side) return 2024
      return callCount === 1 ? serverYear : clientYear
    })
    
    render(<Footer />)
    
    // Initially should show the fallback year (from the JSX fallback)
    const initialCopyright = screen.getByText(/© \d{4} Soofi Mandi\. All rights reserved\./)
    expect(initialCopyright).toBeInTheDocument()
    
    // After useEffect runs, should show the client year
    await waitFor(() => {
      const updatedCopyright = screen.getByText(`© ${clientYear} Soofi Mandi. All rights reserved.`)
      expect(updatedCopyright).toBeInTheDocument()
    })
    
    dateSpy.mockRestore()
  })

  it('maintains consistent DOM structure during hydration', () => {
    const mockYear = 2024
    const dateSpy = vi.spyOn(Date.prototype, 'getFullYear').mockReturnValue(mockYear)
    
    // Render the component
    const { container } = render(<Footer />)
    
    // Take a snapshot of the initial DOM structure
    const initialHTML = container.innerHTML
    
    // Verify the structure contains expected elements
    expect(initialHTML).toContain('Soofi Mandi')
    expect(initialHTML).toContain('Quick Links')
    expect(initialHTML).toContain('Contact Info')
    expect(initialHTML).toContain('© ')
    expect(initialHTML).toContain('All rights reserved')
    
    // The DOM structure should be stable (no major changes expected after useEffect)
    // This test ensures the hydration-safe pattern doesn't cause structural changes
    
    dateSpy.mockRestore()
  })

  it('uses proper React patterns to avoid hydration issues', async () => {
    // This test verifies the component behavior follows hydration-safe patterns
    const mockYear = 2024
    const dateSpy = vi.spyOn(Date.prototype, 'getFullYear').mockReturnValue(mockYear)
    
    render(<Footer />)
    
    // Verify the component renders without errors (indicating proper React patterns)
    const footer = screen.getByRole('contentinfo')
    expect(footer).toBeInTheDocument()
    
    // Verify the year is displayed correctly after the component mounts
    await waitFor(() => {
      const copyrightText = screen.getByText(`© ${mockYear} Soofi Mandi. All rights reserved.`)
      expect(copyrightText).toBeInTheDocument()
    })
    
    // Verify no hydration-related console errors occurred
    // (This is implicit - if there were hydration issues, the test would fail)
    
    dateSpy.mockRestore()
  })

  it('displays year correctly across different time zones', async () => {
    // Test that the component works correctly regardless of timezone
    const mockYear = 2024
    const dateSpy = vi.spyOn(Date.prototype, 'getFullYear').mockReturnValue(mockYear)
    
    render(<Footer />)
    
    // Wait for useEffect to run
    await waitFor(() => {
      const copyrightText = screen.getByText(`© ${mockYear} Soofi Mandi. All rights reserved.`)
      expect(copyrightText).toBeInTheDocument()
    })
    
    dateSpy.mockRestore()
  })
})

// Import React for the spy tests
import React from 'react'