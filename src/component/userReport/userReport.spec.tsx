import { jest } from '@jest/globals'
import { shallowToJson } from "enzyme-to-json";
import * as React from 'react';
import { shallow } from 'enzyme';
import UserReport from './index';

const mockDispatch = jest.fn();
jest.mock('react-redux', () => ({
    useSelector: jest.fn(),
    useDispatch: () => mockDispatch
}));


jest.mock("swr", () => ({
    __esModule: true,
    namedExport: jest.fn(),
    default: () => ({
        data: {"02:02:2022":685.0600000000001,"01:02:2022":1196.15,"03:02:2022":3262.5,"29:01:2022":303.4,"30:01:2022":189,"31:01:2022":201.6},
    }),
}));

describe('UserReport page', () => {
    it('should render properly', function () {
        const wrap = shallow(<UserReport />)
        expect(shallowToJson(wrap)).toMatchSnapshot();
    })
})
