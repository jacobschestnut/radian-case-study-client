'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { DndContext, DragEndEvent } from '@dnd-kit/core';
import { UserDB } from '@/types/UserDB';
import { Column as ColumnType } from '@/types/Column';
import Column from '@/components/Column';
import UserCardDraggable from '@/components/UserCardDraggable';

const UserPage = () => {
  const router = useRouter();
  const { id } = useParams();
  const [user, setUser] = useState<UserDB | null>(null);

  const columns: ColumnType[] = [
    { id: 'KEEP', title: 'KEEP' },
    { id: 'DELETE', title: 'DELETE' }
  ];

  const handleDragEnd = (e: DragEndEvent) => {
    const { active, over } = e;

    if (!over) {
      return;
    }

    const userId = active.id as string;
    const newStatus = over.id as string;

    if (newStatus === 'DELETE') {
      handleDelete(userId);
    } else if (newStatus === 'KEEP') {
      router.push('/users');
    }
  };

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

  const handleDelete = async (id: string) => {
    const res = await fetch(`/api/users/${id}`, { method: 'DELETE' });
    if (res.ok) {
      console.log('Deleted user');
      router.push('/users');
    } else {
      console.log('Failed to delete user');
    }
  };

  if (!user) {
    return <div></div>;
  }

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <div className="bg-gradient-to-r from-blue-500 via-teal-500 to-green-500 flex justify-center items-start h-screen w-full">
        <div className="flex w-full max-w-screen-xl items-center justify-between space-x-6">
          <Column key={columns[0].id} column={columns[0]} />
    
          <UserCardDraggable
            key={user.id}
            user={user}
          />
    
          <Column key={columns[1].id} column={columns[1]} />
        </div>
      </div>
    </DndContext>
  );
};

export default UserPage;
