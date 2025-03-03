'use client';

import { useEffect, useState } from 'react';
import { User } from '@/types/User';

const UsersList = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch('/api/users');
        if (!res.ok) {
          throw new Error('Failed to fetch users in client');
        }  
        const data = await res.json();
        setUsers(data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchUsers();
  }, []);
  
  const handleDelete = async (id: number) => {
    const res = await fetch(`/api/users/${id}`, { method: 'DELETE' });
    if (res.ok) {
      setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id));
    } else {
      console.log('Failed to delete user');
    }
  };
  
  if (loading) return <div>Loading...</div>;
  if (users.length === 0) return <p>No user data</p>
  
  return (
    <div>
    <ul className="flex flex-col">
    {users.map((user: User) => (
      <li key={user.id} className="p-2">
      {user.username} - {user.email}
      <button onClick={() => handleDelete(user.id)}>Delete</button>
      </li>
    ))}
    </ul>
    </div>
  );
};

export default UsersList;
