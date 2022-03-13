import { Formik } from 'formik'; //フォームを簡単に実装できる。
import React from 'react';
import Modal from 'react-modal';
import { useSelector, useDispatch } from 'react-redux';
import { object, string } from 'yup'; //formに入力された値のバリデーションルールを決めることができる
import { AppDispatch } from '../app/store';

import {
  //selectから始まるものはuseselectに関係し、
  selectIsLoadingAuth,
  selectOpenSignIn,
  selectOpenSignUp,
  setOpenSignIn,
  resetOpenSignIn,
  setOpenSignUp,
  resetOpenSignUp,
  fetchCredStart,
  fetchCredEnd,
  fetchAsyncLogin,
  fetchAsyncRegister,
  fetchAsyncGetMyProf,
  fetchAsyncGetProfs,
  fetchAsyncCreateProf,
} from '../app/store/slices/authSlice';

const customStyles = {
  overlay: {
    backgroundColor: '#777777',
  },
  content: {
    top: '55%',
    left: '50%',

    width: 280,
    height: 350,
    padding: '50px',

    transform: 'translate(-50%, -50%)',
  },
};

const Auth: React.FC = () => {
  const openSignIn = useSelector(selectOpenSignIn);
  const openSignUp = useSelector(selectOpenSignUp);
  const isLoadingAuth = useSelector(selectIsLoadingAuth);
  const dispatch: AppDispatch = useDispatch();

  return (
    <>
      <Modal //isopenにtrue false で表示切り替えができる
        isOpen={openSignUp}
        onRequestClose={async () => {
          await dispatch(resetOpenSignUp());
        }}
        style={customStyles}
      >
        <Formik
          initialErrors={{ email: 'required' }}
          initialValues={{ email: '', password: '' }}
          onSubmit={async (values) => {
            await dispatch(fetchCredStart());
            const resultReg = await dispatch(fetchAsyncRegister(values));

            if (fetchAsyncRegister.fulfilled.match(resultReg)) {
              await dispatch(fetchAsyncLogin(values));
              await dispatch(fetchAsyncCreateProf({ nickName: 'anonymous' }));

              await dispatch(fetchAsyncGetProfs());
              await dispatch(fetchAsyncGetMyProf());
            }
            await dispatch(fetchCredEnd());
            await dispatch(resetOpenSignUp());
          }}
          validationSchema={object().shape({
            email: string().email('email format is wrong').required('email is must'),
            password: string().required('password is must').min(4),
          })}
        >
          {({ handleSubmit, handleChange, handleBlur, values, errors, touched, isValid }) => (
            <div>
              <form onSubmit={handleSubmit}>
                <div>
                  <h1>SNS clone</h1>
                  <br />
                  <div>{isLoadingAuth}</div>
                  <br />

                  {touched.password && errors.password ? <div>{errors.password}</div> : null}
                  <br />
                  <br />

                  <button className='' disabled={!isValid} type='submit'>
                    Register
                  </button>
                  <br />
                  <br />
                  <span
                    onClick={async () => {
                      await dispatch(setOpenSignIn());
                      await dispatch(resetOpenSignUp());
                    }}
                  >
                    You already have a account ?
                  </span>
                </div>
              </form>
            </div>
          )}
        </Formik>
      </Modal>

      <Modal
        isOpen={openSignIn}
        onRequestClose={async () => {
          await dispatch(resetOpenSignIn());
        }}
        style={customStyles}
      >
        <Formik
          initialErrors={{ email: 'required' }}
          initialValues={{ email: '', password: '' }}
          onSubmit={async (values) => {
            await dispatch(fetchCredStart());
            const result = await dispatch(fetchAsyncLogin(values));
            if (fetchAsyncLogin.fulfilled.match(result)) {
              await dispatch(fetchAsyncGetProfs());
              await dispatch(fetchAsyncGetMyProf());
            }
            await dispatch(fetchCredEnd());
            await dispatch(resetOpenSignIn());
          }}
          validationSchema={object().shape({
            email: string().email('email format is wrong').required('email is must'),
            password: string().required('password is must').min(4),
          })}
        >
          {({ handleSubmit, handleChange, handleBlur, values, errors, touched, isValid }) => (
            <div>
              <form onSubmit={handleSubmit}>
                <div>
                  <h1>SNS clone</h1>
                  <br />
                  <div>{isLoadingAuth}</div>
                  <br />

                  {touched.password && errors.password ? <div>{errors.password}</div> : null}
                  <br />
                  <br />
                  <button className='' disabled={!isValid} type='submit'>
                    Login
                  </button>
                  <br />
                  <br />
                  <span
                    onClick={async () => {
                      await dispatch(resetOpenSignIn());
                      await dispatch(setOpenSignUp());
                    }}
                  >
                    You don't have a account ?
                  </span>
                </div>
              </form>
            </div>
          )}
        </Formik>
      </Modal>
    </>
  );
};

export default Auth;
