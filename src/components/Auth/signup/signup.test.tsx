import React from 'react';
import firebase from 'firebase/compat/app';
import { render, fireEvent } from '@testing-library/react';
import SignUp from './';

jest.mock('firebase/compat/app', () => {
  const auth = jest.fn().mockReturnValue({
    createUserWithEmailAndPassword: jest.fn(),
    currentUser: { updateProfile: jest.fn() },
  });

  return { auth };
});

describe('SignUp', () => {
  it('creates a user with email and password', async () => {
    const { getByLabelText, getByText } = render(<SignUp />);

    fireEvent.change(getByLabelText(/display name/i), {
      target: { value: 'John Doe' },
    });

    fireEvent.change(getByLabelText(/email/i), {
      target: { value: 'johndoe@example.com' },
    });

    fireEvent.change(getByLabelText(/password/i), {
      target: { value: 'password' },
    });

    fireEvent.click(getByText(/submit/i));

    expect(firebase.auth().createUserWithEmailAndPassword).toHaveBeenCalledWith(
      'johndoe@example.com',
      'password',
    ); 
  });

});