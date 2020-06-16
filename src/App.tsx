import React from 'react';
import shortid from 'shortid';
import { Content, Loading } from './styles';
import UserComponent from './components/user/UserComponent';
import { useInfiniteScroll } from './hooks/useInfiniteScroll';
import { getUsers } from './api/api';

const App: React.FC = () => {
    const { data, loading, handleScroll } = useInfiniteScroll(getUsers);

    return (
        <div className="App">
            <Content onScroll={handleScroll}>
                {data
                    && data.map((user) => (
                        <UserComponent key={shortid.generate()} user={user} />
                    ))}
            </Content>
            {loading && <Loading>Loading ...</Loading>}
        </div>
    );
};

export default App;
