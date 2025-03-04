import { useDroppable } from '@dnd-kit/core';
import { Column as ColumnType } from "@/types/Column";
import { UserDB } from "@/types/UserDB";

type ColumnProps = {
  column: ColumnType;
  user?: UserDB;
}

const Column = ({ column }: ColumnProps) => {
  const { setNodeRef, isOver } = useDroppable({
    id: column.id,
  });

  return (
    <div className='flex flex-grow h-screen flex-col items-center'>
      <div
        ref={setNodeRef}
        className={`flex flex-grow h-full w-full flex-col items-center rounded-md bg-base-400 p-8 ${isOver ? 'border' : ''}`}
      >
        <h2 className="text-3xl font-bold mt-6">{column.title}</h2>
      </div>
    </div>
  );
};

export default Column;
