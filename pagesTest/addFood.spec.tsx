import { jest } from '@jest/globals'
import { shallowToJson } from "enzyme-to-json";
import * as React from 'react';
import { shallow } from 'enzyme';
import { AddFoodComponent } from '../pages/addFood';

const useRouter = jest.spyOn(require("next/router"), "useRouter");

const mockDispatch = jest.fn();
jest.mock('react-redux', () => ({
    useSelector: jest.fn(),
    useDispatch: () => mockDispatch,
}));

describe('AddFood page', () => {
    it('should render properly', function () {
        jest.clearAllMocks();
        useRouter.mockImplementationOnce(()=>({ query: 'abc', push: () => { } }));
        const wrap = shallow(<AddFoodComponent />)
        expect(shallowToJson(wrap)).toMatchSnapshot();
    })
})
