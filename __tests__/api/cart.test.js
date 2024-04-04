import handle from '../../pages/api/cart';
import { mongooseConnect } from '../../lib/mongoose';
import { Product } from '../../models/Product';
import httpMocks from 'node-mocks-http';

jest.mock('../../lib/mongoose', () => ({
    mongooseConnect: jest.fn().mockResolvedValue()
}));

jest.mock('../../models/Product', () => ({
    Product: {
        find: jest.fn().mockResolvedValue([{ _id: '1', title: 'Product 1' }, { _id: '2', title: 'Product 2' }])
    }
}));

describe('/api/cart Endpoint Test', () => {
    it('returns products by IDs', async () => {
        const mockRequest = httpMocks.createRequest({
            method: 'POST',
            url: '/',
            body: {
                ids: ['1', '2']
            }
        });

        const mockResponse = httpMocks.createResponse();

        await handle(mockRequest, mockResponse);

        expect(JSON.parse(mockResponse._getData())).toEqual([{ _id: '1', title: 'Product 1' }, { _id: '2', title: 'Product 2' }]);
        expect(mongooseConnect).toHaveBeenCalledTimes(1);
        expect(Product.find).toHaveBeenCalledWith({ _id: { $in: mockRequest.body.ids } });
    });

    it('returns 500 error if there is an internal server error', async () => {
        const errorMessage = 'Internal Server Error';
        Product.find.mockRejectedValue(new Error(errorMessage));

        const mockRequest = httpMocks.createRequest({
            method: 'POST',
            url: '/'
        });

        const mockResponse = httpMocks.createResponse();

        await handle(mockRequest, mockResponse);

        expect(mockResponse._getStatusCode()).toBe(500);
        expect(JSON.parse(mockResponse._getData())).toEqual({ error: errorMessage });
    });
});
