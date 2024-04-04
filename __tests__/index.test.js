import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import Checkout from "../pages/checkout";

describe('Checkout', () => {
    it('renders a heading', () => {
        render(<Checkout />)

        const heading = screen.getByRole('heading', { level: 1 })

        expect(heading).toBeInTheDocument()
    })
})