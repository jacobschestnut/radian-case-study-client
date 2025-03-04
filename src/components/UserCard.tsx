import { UserDB } from "@/types/UserDB";
import { useRouter } from "next/navigation";

type UserCardProps = {
  user: UserDB;
}

const UserCard = ({ user }: UserCardProps) => {
  const router = useRouter();

  const handleCardClick = () => {
    router.push(`/users/${user.id}`);
  };

  return (
    <div
      className="card bg-base-300 text-neutral-content w-96 h-80 m-8 shadow-sm cursor-pointer flex flex-col justify-between"
      onClick={handleCardClick}
    >
      <div className="card-body flex flex-col justify-between items-center text-center h-full">
        <h2 className="card-title text-xl font-semibold">{`${user.first_name} ${user.last_name}`}</h2>
        <p className="text-sm">{user.email}</p>
        <p className="text-sm">{user.address}</p>
        <p className="text-sm">{user.date_of_birth}</p>

        <div className="card-actions flex justify-between pt-6">
          <p className="btn btn-primary w-16">{user.tier}</p>
          <p className="btn btn-primary w-16">{user.billing_period}</p>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
