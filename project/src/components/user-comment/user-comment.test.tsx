import {Router} from 'react-router-dom';
import {screen, render} from '@testing-library/react';
import {createMemoryHistory} from 'history';
import {mockComment} from '../../utils/mocks';
import UserComment from './user-comment';

const history = createMemoryHistory();

describe('Component: UserComment', () => {
  it('should render correctly', () => {
    const comment = mockComment;

    render (
      <Router history={history}>
        <UserComment comment={comment}/>
      </Router>,
    );

    expect(screen.getByText(/Rating/i)).toBeInTheDocument();
  });
});
