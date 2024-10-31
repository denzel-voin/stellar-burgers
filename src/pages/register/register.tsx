import { FC, SyntheticEvent, useEffect } from 'react';
import { RegisterUI } from '@ui-pages';
import { Preloader } from '@ui';
import {
  isErrorSelector,
  isLoadingSelector,
  registerUser,
  resetErrorMessage
} from '../../services/slices/userSlice';
import { useSelector, useDispatch } from '../../services/store';
import { useForm } from '../../hooks/useForm';

export const Register: FC = () => {
  const dispatch = useDispatch();
  const { values, createSetter } = useForm({
    userName: '',
    email: '',
    password: ''
  });
  const isLoading = useSelector(isLoadingSelector);
  const error = useSelector(isErrorSelector);

  useEffect(() => {
    dispatch(resetErrorMessage());
  }, [dispatch]);

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    dispatch(
      registerUser({
        name: values.userName,
        password: values.password,
        email: values.email
      })
    );
  };

  if (isLoading) {
    return <Preloader />;
  }

  return (
    <RegisterUI
      errorText={
        error ? 'Пользователь с таким адресом уже существует' : undefined
      }
      email={values.email}
      userName={values.userName}
      password={values.password}
      setEmail={createSetter('email')}
      setPassword={createSetter('password')}
      setUserName={createSetter('userName')}
      handleSubmit={handleSubmit}
    />
  );
};
