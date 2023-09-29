import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { HeaderComponent } from '@/components'

describe('HeaderComponent', () => {
  it('Should render the title correctly', async () => {
    // Setup
    render(<HeaderComponent />)
    const titleElement = screen.getByText('Idoven.ai Coding Challenge')

    // Expectations
    expect(titleElement).toBeInTheDocument()
  })
})
