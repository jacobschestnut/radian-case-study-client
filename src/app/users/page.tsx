'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { UserDB } from '@/types/UserDB';
import UserCard from '@/components/UserCard';

const UsersList = () => {
  const router = useRouter();
  const [users, setUsers] = useState<UserDB[]>([]);
  
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
      }
    };
    
    fetchUsers();
  }, []);
  
  return (
    <div className='flex flex-col h-screen bg-gradient-to-r from-blue-500 via-teal-500 to-green-500 max-w-screen mx-auto p-6 justify-start items-center'>
      <div className="flex justify-center items-center">
        {users.map((user) => (
          <UserCard
            key={user.id}
            user={user}
          />
        ))}
      </div>
      <button
        className="btn btn-outline m-10 py-10 w-100"
        onClick={() => router.push('/form')}
      >
        <h3 className="text-xl text-white">New User</h3>
      </button>
    </div>
  );
};

export default UsersList;
