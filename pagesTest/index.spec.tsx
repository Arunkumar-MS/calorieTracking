import { jest } from '@jest/globals';
import * as React from 'react';
import { shallowToJson } from "enzyme-to-json";
import { shallow } from 'enzyme';
import { Home } from '../pages/index';

const mockDispatch = jest.fn();
jest.mock('react-redux', () => ({
    useSelector: jest.fn(),
    useDispatch: () => mockDispatch
}));


jest.mock("swr", () => ({
    __esModule: true,
    namedExport: jest.fn(),
    default: () => ({
        data: [
            { _id: 1, servingUnit: 'slice', servingQty: 1, servingWeightGrams: 343, url: 'http://asdasd.com', calories: 123, userId: '23423234', addedDate: 234234232 },
            { _id: 2, servingUnit: 'slice', servingQty: 1, servingWeightGrams: 343, url: 'http://asdasd.com', calories: 123, userId: '23423234', addedDate: 234234232 },
        ],
    }),
}));


describe('Pages', () => {
    it('should render properly', function () {
        jest.clearAllMocks();
        const wrap = shallow(<Home user={{role: 'admin', name: 'abc', calorieLimit: 2100, userId: '2323'}}/>)
        expect(shallowToJson(wrap)).toMatchSnapshot();
    })
});

