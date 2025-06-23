import { useEffect, useState } from 'react';
import { User } from '../types/User';
import { ApiErrorType, ApiStatus } from '../types/Api';

export function useGitHubUsers(query: string) {
  const [users, setUsers] = useState<User[]>([]);
  const [status, setStatus] = useState<ApiStatus>('idle');
  const [errorType, setErrorType] = useState<ApiErrorType>('none');

  useEffect(() => {
    if (!query) {
      setUsers([]);
      setStatus('idle');
      return;
    }

    const controller = new AbortController();
    const fetchData = async () => {
      setStatus('loading');
      setErrorType('none');

      try {
        const res = await fetch(`https://api.github.com/search/users?q=${query}`, {
          signal: controller.signal,
        });

        if (res.status === 403) 
        {
          setErrorType('rate_limit');
          setStatus('error');
          return;
        }

        if (!res.ok) 
        {
          setErrorType('unknown');
          setStatus('error');
          return;
        }

        const data = await res.json();

        if (!data.items || data.items.length === 0) {
          setUsers([]);
          setStatus('success');
          return;
        }

        const formattedUsers: User[] = data.items.map((item: any) => ({
          id: item.id,
          login: item.login,
          avatar_url: item.avatar_url,
        }));

        setUsers(formattedUsers);
        setStatus('success');
      } 
      catch (error) 
      {
        if (error instanceof DOMException && error.name === 'AbortError') return;
        setErrorType('network');
        setStatus('error');
      }
    };

    fetchData();

    return () => controller.abort();
  }, [query]);

  return { users, status, errorType };
}