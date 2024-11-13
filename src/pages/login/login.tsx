import { FC, SyntheticEvent, useEffect } from 'react';
import { LoginUI } from '@ui-pages';
import {
  isErrorSelector,
  isLoadingSelector,
  loginUser,
  resetErrorMessage
} from '../../services/slices/userSlice';
import { useDispatch, useSelector } from '../../services/store';
import { Preloader } from '@ui';
import { useForm } from '../../hooks/useForm';

export const Login: FC = () => {
  const dispatch = useDispatch();
  const { values, createSetter } = useForm({
    email: '',
    password: ''
  });

  const isError = useSelector(isErrorSelector);
  const isLoading = useSelector(isLoadingSelector);

  useEffect(() => {
    dispatch(resetErrorMessage());
  }, [dispatch]);

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    dispatch(loginUser({ email: values.email, password: values.password }));
  };

  if (isLoading) return <Preloader />;

  return (
    <LoginUI
      errorText={isError ? 'Электронный адрес или пароль введены неверно' : ''}
      email={values.email}
      setEmail={createSetter('email')}
      password={values.password}
      setPassword={createSetter('password')}
      handleSubmit={handleSubmit}
    />
  );
};
