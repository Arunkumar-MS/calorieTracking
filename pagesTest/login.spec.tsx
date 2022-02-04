import { jest } from '@jest/globals'
import { shallowToJson } from "enzyme-to-json";
import * as React from 'react';
import { shallow } from 'enzyme';
import { Login } from '../pages/login';

const mockDispatch = jest.fn();
jest.mock('react-redux', () => ({
    useSelector: jest.fn(),
    useDispatch: () => mockDispatch
}));

describe('Login page', () => {
    it('should render properly', function () {
        jest.clearAllMocks();
        const wrap = shallow(<Login />)
        expect(shallowToJson(wrap)).toMatchSnapshot();
    })
})
