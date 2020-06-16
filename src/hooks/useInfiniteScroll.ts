import React from 'react';
import { User } from '../components/types/type';
import { getUsers } from '../api/api';

export const useInfiniteScroll = () => {
    const [page, setPage] = React.useState<number>(1);
    const [users, setUsers] = React.useState<User[]>([]);
    const [loading, setLoading] = React.useState<boolean>(true);

    const handleScroll = (event) => {
        const { scrollTop, clientHeight, scrollHeight } = event.currentTarget;

        if (scrollHeight - scrollTop === clientHeight) {
            setPage((prev) => prev + 1);
        }
    };

    React.useEffect(() => {
        const loadUsers = async () => {
            setLoading(true);
            const newUsers = await getUsers(page);
            setUsers((prev: User[]) => [...prev, ...newUsers]);
            setLoading(false);
        };

        loadUsers().catch((err) => console.log(err));
    }, [page]);

    return { users, loading, handleScroll };
};
