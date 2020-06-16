import React from 'react';
import { Wrapper } from './styles';
import { User } from '../types/type';

interface IProps {
    user: User;
}

const UserComponent: React.FC<IProps> = (props: IProps) => {
    const { user } = props;

    return <Wrapper>{user.email}</Wrapper>;
};

export default UserComponent;
