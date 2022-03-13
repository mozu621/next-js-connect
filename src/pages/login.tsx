import { Formik } from 'formik';
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { AppDispatch } from '../app/store';
import {
  fetchCredStart,
  fetchAsyncRegister,
  fetchAsyncLogin,
  fetchAsyncCreateProf,
  fetchCredEnd,
} from '../app/store/slices/authSlice';

const Login: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  return (
    <>
      <h1>My Form</h1>
      <Formik
        initialErrors={{ email: 'required' }}
        initialValues={{ email: '', password: '' }}
        onSubmit={async (values) => {
          await dispatch(fetchCredStart());
          const resultReg = await dispatch(fetchAsyncRegister(values));
          await dispatch(fetchCredEnd());
        }}
      >
        {(props) => (
          <form onSubmit={props.handleSubmit}>
            <input
              type='text'
              onChange={props.handleChange}
              onBlur={props.handleBlur}
              value={props.values.email}
              name='email'
            />
            <input
              type='text'
              onChange={props.handleChange}
              onBlur={props.handleBlur}
              value={props.values.password}
              name='password'
            />
            {props.errors.email && <div id='feedback'>{props.errors.email}</div>}
            <button
              className='py-2 px-4 font-bold bg-blue-500 hover:bg-blue-700 rounded-full '
              type='submit'
            >
              Submit
            </button>
            <button
              className='py-2 px-4 font-bold bg-blue-500 hover:bg-blue-700 rounded-full '
              type='submit'
            >
              jjiji
            </button>
          </form>
        )}
      </Formik>
    </>
  );
};

export default Login;
