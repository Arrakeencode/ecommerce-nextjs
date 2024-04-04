
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import Success from '../../pages/success';
import { CartContext } from '../../lib/context/CartContext';

// Créez une fonction mock pour clearCart
const mockClearCart = jest.fn();

// Enveloppez votre composant Success dans le provider CartContext avec le mock de clearCart
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

        // Vous pouvez simuler un clic sur le lien pour continuer les achats si nécessaire.
        // Note: Si le lien déclenche une navigation ou un appel de fonction, vous devrez utiliser fireEvent ou userEvent de @testing-library/user-event pour simuler cette action.

        // Vérifiez que la fonction mockClearCart a été appelée si nécessaire
        // Note: Cette étape dépend de l'interaction de l'utilisateur avec le composant qui déclencherait l'appel à clearCart.
    });
});
