import { jest } from '@jest/globals'
import { shallowToJson } from "enzyme-to-json";
import * as React from 'react';
import { shallow } from 'enzyme';
import { ManageFoodEntry } from '../pages/manageFoodEntry';
import * as redux from 'react-redux';

const foodList = [
    { _id: 1, servingUnit: 'slice', servingQty: 1, servingWeightGrams: 343, url: 'http://asdasd.com', calories: 123, userId: '23423234', addedDate: 234234232 },
    { _id: 2, servingUnit: 'slice', servingQty: 1, servingWeightGrams: 343, url: 'http://asdasd.com', calories: 123, userId: '23423234', addedDate: 234234232 },
];

jest
  .spyOn(redux, 'useSelector')
  .mockReturnValueOnce(foodList)

jest
  .spyOn(redux, 'useDispatch')
  .mockReturnValueOnce(jest.fn())

jest.mock("swr", () => ({
    __esModule: true,
    namedExport: jest.fn(),
    default: () => ({
        data: foodList,
    }),
}));

describe('ManageFoodEntry page', () => {
    it('should render properly', function () {
        jest.clearAllMocks();
        const wrap = shallow(<ManageFoodEntry />)
        expect(shallowToJson(wrap)).toMatchSnapshot();
    })
})
