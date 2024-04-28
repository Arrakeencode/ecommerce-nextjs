
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import Success from '../../pages/success';
import { CartContext } from '../../lib/context/CartContext';

const mockClearCart = jest.fn();
const renderWithCartContext = (component) => {
    return render(
        <CartContext.Provider value={{ clearCart: mockClearCart }}>
            {component}
        </CartContext.Provider>
    );
};

describe('Success', () => {
    it('renders success message and continue shopping link', () => {
        renderWithCartContext(<Success />);

        // Vérifiez que le message de succès est rendu
        expect(screen.getByText(/Checkout Successful/i)).toBeInTheDocument();

        // Vérifiez que le lien Continuer les achats est rendu
        const continueShoppingLink = screen.getByRole('link', { name: /Continue Shopping/i });
        expect(continueShoppingLink).toBeInTheDocument();

    });
});
