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
      className="card bg-base-300 text-neutral-content w-96 m-8 shadow-sm cursor-pointer"
      style={style}
    >
      <div className="card-body items-center text-center">
        <h2 className="card-title">{`${user.first_name} ${user.last_name}`}</h2>
        <p>{user.email}</p>
        <p>{user.address}</p>
        <p>{user.date_of_birth}</p>
        <div className="card-actions justify-end pt-6">
          <p className="btn btn-primary w-16">{user.tier}</p>
          <p className="btn btn-primary w-16">{user.billing_period}</p>
        </div>
      </div>
    </div>
  );
};

export default UserCardDraggable;
