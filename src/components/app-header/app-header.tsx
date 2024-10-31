import { FC } from 'react';
import { AppHeaderUI } from '@ui';
import { getUserDataSelector } from '../../services/slices/userSlice';
import { useSelector } from '../../services/store';

export const AppHeader: FC = () => {
  const userData = useSelector(getUserDataSelector);

  return <AppHeaderUI userName={userData ? userData.name : ''} />;
};
