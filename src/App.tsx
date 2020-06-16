import React, { useState, useEffect } from 'react';
import { getUsers } from './api/api';
import { Content, Loading } from './styles';
import UserComponent from './components/user/UserComponent';
import { User } from './components/types/type';

const App: React.FC = () => {
    const [page, setPage] = useState<number>(1);
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    const handleScroll = (event) => {
        const { scrollTop, clientHeight, scrollHeight } = event.currentTarget;

        if (scrollHeight - scrollTop === clientHeight) {
            setPage((prev) => prev + 1);
        }
    };

    useEffect(() => {
        const loadUsers = async () => {
            setLoading(true);
            const newUsers = await getUsers(page);
            setUsers((prev: User[]) => [...prev, ...newUsers]);
            setLoading(false);
        };

        loadUsers().catch((err) => console.log(err));
    }, [page]);

    return (
        <div className="App">
            <Content onScroll={handleScroll}>
                {users
                    && users.map((user) => (
                        <UserComponent key={user.cell} user={user} />
                    ))}
            </Content>
            {loading && <Loading>Loading ...</Loading>}
        </div>
    );
};

export default App;
