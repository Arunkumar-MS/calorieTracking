import { jest } from '@jest/globals'
import { shallowToJson } from "enzyme-to-json";
import * as React from 'react';
import { shallow } from 'enzyme';
import { InviteFriendComponent } from '../pages/inviteFriend';

const mockDispatch = jest.fn();
jest.mock('react-redux', () => ({
    useSelector: jest.fn(),
    useDispatch: () => mockDispatch,
}));

describe('InviteFriend page', () => {
    it('should render properly', function () {
        jest.clearAllMocks();
        const wrap = shallow(<InviteFriendComponent />)
        expect(shallowToJson(wrap)).toMatchSnapshot();
    })
})
