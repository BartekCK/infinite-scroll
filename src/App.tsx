import React, { useState, useEffect } from 'react';
import { Content, Loading } from './styles';
import UserComponent from './components/user/UserComponent';
import { useInfiniteScroll } from './hooks/useInfiniteScroll';

const App: React.FC = () => {
    const { users, loading, handleScroll } = useInfiniteScroll();

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
