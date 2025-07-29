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

describe('Footer Component', () => {
  beforeEach(() => {
    // Reset any mocks before each test
    vi.clearAllMocks()
  })

  afterEach(() => {
    // Clean up after each test
    vi.restoreAllMocks()
  })

  it('renders without hydration errors', () => {
    // This test verifies the component renders without throwing errors
    expect(() => render(<Footer />)).not.toThrow()
    
    // Verify the footer element is present
    const footer = screen.getByRole('contentinfo')
    expect(footer).toBeInTheDocument()
    
    // Verify key elements are present
    expect(screen.getByText('Soofi Mandi')).toBeInTheDocument()
    expect(screen.getByText('Quick Links')).toBeInTheDocument()
    expect(screen.getByText('Contact Info')).toBeInTheDocument()
  })

  it('displays fallback year initially and updates after mount', async () => {
    // Mock the current year for consistent testing
    const mockYear = 2024
    const dateSpy = vi.spyOn(Date.prototype, 'getFullYear').mockReturnValue(mockYear)
    
    render(<Footer />)
    
    // Initially, the component should show the fallback year (from new Date().getFullYear())
    // or null state, but the fallback in the JSX ensures it shows the current year
    const copyrightText = screen.getByText(/© \d{4} Soofi Mandi\. All rights reserved\./)
    expect(copyrightText).toBeInTheDocument()
    
    // Wait for the useEffect to run and update the state
    await waitFor(() => {
      const updatedCopyrightText = screen.getByText(`© ${mockYear} Soofi Mandi. All rights reserved.`)
      expect(updatedCopyrightText).toBeInTheDocument()
    })
    
    dateSpy.mockRestore()
  })

  it('handles null year state gracefully with fallback', () => {
    // Mock Date to return a specific year
    const mockYear = 2024
    const dateSpy = vi.spyOn(Date.prototype, 'getFullYear').mockReturnValue(mockYear)
    
    render(<Footer />)
    
    // The component should handle the initial null state gracefully
    // by showing the fallback year from new Date().getFullYear()
    const copyrightText = screen.getByText(/© \d{4} Soofi Mandi\. All rights reserved\./)
    expect(copyrightText).toBeInTheDocument()
    expect(copyrightText.textContent).toContain(mockYear.toString())
    
    dateSpy.mockRestore()
  })

  it('updates year correctly after component mounts', async () => {
    const mockYear = 2025
    const dateSpy = vi.spyOn(Date.prototype, 'getFullYear').mockReturnValue(mockYear)
    
    render(<Footer />)
    
    // Wait for useEffect to run and update the year
    await waitFor(() => {
      const copyrightText = screen.getByText(`© ${mockYear} Soofi Mandi. All rights reserved.`)
      expect(copyrightText).toBeInTheDocument()
    })
    
    dateSpy.mockRestore()
  })

  it('renders all contact information correctly', () => {
    render(<Footer />)
    
    // Verify contact information is present
    expect(screen.getByText('Address')).toBeInTheDocument()
    expect(screen.getByText(/Soofi Mandi Bangalore/)).toBeInTheDocument()
    expect(screen.getByText('Phone')).toBeInTheDocument()
    expect(screen.getByText('+91 9562577775')).toBeInTheDocument()
    expect(screen.getByText('Email')).toBeInTheDocument()
    expect(screen.getByText('soofimandi@gmail.com')).toBeInTheDocument()
    expect(screen.getByText('Hours')).toBeInTheDocument()
    expect(screen.getByText('Daily: 11:00 AM - 11:30 PM')).toBeInTheDocument()
  })

  it('renders all quick links correctly', () => {
    render(<Footer />)
    
    // Verify quick links are present
    expect(screen.getByText('Home')).toBeInTheDocument()
    expect(screen.getByText('Menu')).toBeInTheDocument()
    expect(screen.getByText('About Us')).toBeInTheDocument()
    expect(screen.getByText('Contact')).toBeInTheDocument()
  })

  it('renders social media links with proper accessibility', () => {
    render(<Footer />)
    
    // Verify social media links have proper aria-labels
    expect(screen.getByLabelText('Facebook')).toBeInTheDocument()
    expect(screen.getByLabelText('Instagram')).toBeInTheDocument()
    expect(screen.getByLabelText('Twitter')).toBeInTheDocument()
  })

  it('renders privacy and terms links', () => {
    render(<Footer />)
    
    expect(screen.getByText('Privacy Policy')).toBeInTheDocument()
    expect(screen.getByText('Terms of Service')).toBeInTheDocument()
  })

  it('has proper semantic structure', () => {
    render(<Footer />)
    
    // Verify the footer has proper semantic structure
    const footer = screen.getByRole('contentinfo')
    expect(footer).toBeInTheDocument()
    expect(footer.tagName).toBe('FOOTER')
  })
})