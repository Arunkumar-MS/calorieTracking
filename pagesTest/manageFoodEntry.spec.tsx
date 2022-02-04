import { jest } from '@jest/globals'
import { shallowToJson } from "enzyme-to-json";
import * as React from 'react';
import { shallow } from 'enzyme';
import { ManageFoodEntry } from '../pages/manageFoodEntry';

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

describe('ManageFoodEntry page', () => {
    it('should render properly', function () {
        jest.clearAllMocks();
        const wrap = shallow(<ManageFoodEntry />)
        expect(shallowToJson(wrap)).toMatchSnapshot();
    })
})
