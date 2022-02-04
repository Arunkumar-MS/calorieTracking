jest.mock('js-cookie', ()=> ({get: () => 'token'}))
import { jest } from '@jest/globals'
import { shallowToJson } from "enzyme-to-json";
import * as React from 'react';
import { shallow } from 'enzyme';
import withAuth from './index';

const mockDispatch = jest.fn();
jest.mock('react-redux', () => ({
    useSelector: jest.fn(),
    useDispatch: () => mockDispatch
}));

const routerMock = jest.fn();

jest.mock("swr", () => ({
    __esModule: true,
    namedExport: jest.fn(),
    default: () => ({
        data: { role: 'admin', name: 'sd', userId: '23234', calorieLimit: 123 },
    }),
}));

describe('WithAuth page', () => {
    it('should render properly', function () {
        jest.clearAllMocks();
        const Comp = withAuth(() => <div />, ['admin', 'user']);
        const wrap = shallow(<Comp user={{ role: 'admin', name: 'sd', userId: '23234', calorieLimit: 123 }} />)
        expect(shallowToJson(wrap)).toMatchSnapshot();
    })
})
