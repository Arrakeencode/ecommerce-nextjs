import {render, screen} from "@testing-library/react";
import '@testing-library/jest-dom'
import Home from "../../../pages";


describe('Homme page' , () => {
    it('should render properly', () =>
    {
        render(<Home />);
        const header = screen.getByRole('heading');
        const headetText = 'Hello World';
        expect(header).toHaveTextContent(headetText)
    });
})