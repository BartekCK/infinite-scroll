import React from 'react';

export const useInfiniteScroll = (apiFunction: (page: number) => Promise<any>) => {
    const [page, setPage] = React.useState<number>(1);
    const [data, setData] = React.useState<any[]>([]);
    const [loading, setLoading] = React.useState<boolean>(true);
    const [error, setError] = React.useState<string>('');

    const handleScroll = (event) => {
        const { scrollTop, clientHeight, scrollHeight } = event.currentTarget;

        if (scrollHeight - scrollTop === clientHeight) {
            setPage((prev) => prev + 1);
        }
    };

    React.useEffect(() => {
        const loadUsers = async () => {
            setLoading(true);
            const newData = await apiFunction(page);
            setData((prev: any[]) => [...prev, ...newData]);
            setLoading(false);
        };

        loadUsers().catch((err) => setError(err));
    }, [page]);

    return {
        data, loading, handleScroll, error,
    };
};
