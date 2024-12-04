import React from 'react';
import style from './profile.setting.module.css';
import { Button, Input } from '@ya.praktikum/react-developer-burger-ui-components';
import { getUser } from '../../../services/slices/user/user';
import { useSelector } from '../../../services/store';
export const ProfileSetting: React.FC = () => {
  const user = useSelector(getUser);
  const [name, setName] = React.useState<string>(user?.name || '');
  const [email, setEmail] = React.useState<string>(user?.email || '');
  const [password, setPassword] = React.useState<string>('');
  const [showPassword, setShowPassword] = React.useState<boolean>(false);
  const [showButton, setShowButton] = React.useState<boolean>(false);

  const emailRef = React.useRef<HTMLInputElement | null>(null);
  const passwordRef = React.useRef<HTMLInputElement | null>(null);

  const onIconClick = () => {
    setShowPassword(!showPassword);
    setTimeout(() => {
      if (passwordRef.current) {
        passwordRef.current.focus();
      }
    }, 0);
  };

  const handleSave = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      //@ts-ignore
      await dispatch(updateUser({ name, email, password }));
      setShowButton(false);
      alert('Данные успешно обновлены');
    } catch (error) {
      console.error('Failed to update user data:', error);
    }
  };

  const handleCancel = () => {
    setName(user?.name || '');
    setEmail(user?.email || '');
    setPassword(user?.password || '');
    setShowButton(false);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    setValue: React.Dispatch<React.SetStateAction<string>>,
  ) => {
    setValue(e.target.value);
    setShowButton(true);
  };

  React.useEffect(() => {
    setName(user?.name || '');
    setEmail(user?.email || '');
  }, [user]);

  return (
    <div className={style.setting__profile}>
      <form onSubmit={handleSave}>
        <div className={style.input__container}>
          <Input
            type={'text'}
            placeholder={'Имя'}
            onChange={(e) => handleInputChange(e, setName)}
            value={name}
            icon={'EditIcon'}
            name={'name'}
            error={false}
            ref={emailRef}
            errorText={'Ошибка'}
            size={'default'}
            extraClass="ml-1"
          />
        </div>
        <div className={style.input__container}>
          <Input
            type={'email'}
            placeholder={'E-mail'}
            onChange={(e) => handleInputChange(e, setEmail)}
            value={email}
            icon={'EditIcon'}
            name={'email'}
            error={false}
            ref={emailRef}
            errorText={'Ошибка'}
            size={'default'}
            extraClass="ml-1"
          />
        </div>
        <div className={style.input__container}>
          <Input
            type={showPassword ? 'text' : 'password'}
            placeholder={'Пароль'}
            onChange={(e) => handleInputChange(e, setPassword)}
            icon={'EditIcon'}
            value={password}
            name={'password'}
            error={false}
            ref={passwordRef}
            onIconClick={onIconClick}
            errorText={'Ошибка'}
            size={'default'}
            extraClass="ml-1"
          />
        </div>

        {showButton && (
          <div className={style.buttons__container}>
            <span onClick={handleCancel} className={style.cancel}>
              Отмена
            </span>
            <Button htmlType="submit" type="primary" size="small" extraClass="ml-2">
              Сохранить
            </Button>
          </div>
        )}
      </form>
    </div>
  );
};
