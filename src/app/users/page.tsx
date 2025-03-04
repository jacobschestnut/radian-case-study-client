'use client';

import { useEffect, useState } from 'react';
import { UserDB } from '@/types/UserDB';
import UserCard from '@/components/UserCard';

const UsersList = () => {
  const [users, setUsers] = useState<UserDB[]>([]);
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
  
  if (loading) return <div>Loading...</div>;
  if (users.length === 0) return <p>No user data</p>
  
  return (
    <div className="max-w-screen mx-auto p-6 flex justify-center items-start h-screen">
      {users.map((user) => (
        <UserCard
          key={user.id}
          user={user}
        />
      ))}
    </div>
  );
};

export default UsersList;
