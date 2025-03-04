import { UserDB } from "@/types/UserDB";
import { useDraggable } from '@dnd-kit/core';

type UserCardProps = {
  user: UserDB;
}

const UserCardDraggable = ({ user }: UserCardProps) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: user.id.toString(),
  });

  const style = transform ? {
    transform: `translate(${transform.x}px, ${transform.y}px)`
  } : undefined

  return (
<div
ref={setNodeRef}
{...listeners}
{...attributes}
className="card border bg-base-300 text-neutral-content w-84 h-80 m-8 shadow-sm cursor-pointer flex flex-col justify-between"
style={style}
>
<div className="card-body flex flex-col justify-between items-center text-center h-full">
  <h2 className="card-title text-2xl font-bold">{`${user.first_name} ${user.last_name}`}</h2>

  <div className="flex flex-col items-start w-full">
    <p className="text-sm text-left p-2">{user.email}</p>
    <p className="text-sm text-left p-2">{user.address}</p>
    <p className="text-sm text-left p-2">{`DOB: ${user.date_of_birth}`}</p>
  </div>

  <div className="divider"></div>

  <div className="card-actions flex justify-between">
    <p className="rounded-md bg-success py-4 px-8 text-lg">{user.tier}</p>
    <p className="rounded-md bg-success py-4 px-8 text-lg">{user.billing_period}</p>
  </div>
</div>
</div>
  );
};

export default UserCardDraggable;