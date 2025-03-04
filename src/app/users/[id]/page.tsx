'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { UserDB } from '@/types/UserDB';
import UserCard from '@/components/UserCard';
import { Column as ColumnType } from '@/types/Column';
import Column from '@/components/Column';

const UserPage = () => {

  const columns: ColumnType[] = [
    {id: 'KEEP', title: 'KEEP'},
    {id: 'DELETE', title: 'DELETE'}
  ];
  
  


















  const { id } = useParams();
  const [user, setUser] = useState<UserDB | null>(null);

  useEffect(() => {
    if (id) {
      const fetchUser = async (id: string) => {
        try {
          const res = await fetch(`/api/users/${id}`);
          if (!res.ok) {
            throw new Error('Failed to fetch user data');
          }
          const data = await res.json();
          setUser(data);
        } catch (error) {
          console.error(error);
        }
      };

      fetchUser(id.toString());
    }
  }, [id]);

  const handleDelete = async (id: number) => {
    const res = await fetch(`/api/users/${id}`, { method: 'DELETE' });
    if (res.ok) {
      console.log('Deleted user');
    } else {
      console.log('Failed to delete user');
    }
  };

  if (!user) {
    return <div>User not found</div>;
  }

  return (
    <div className="max-w-screen mx-auto p-6 flex justify-center items-start h-screen">
      <UserCard
        key={user.id}
        user={user}
      />

      {columns.map((column) => (
        <Column
          key={column.id}
          column={column}
        />
      ))}
    </div>
  );
};

export default UserPage;
