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
    <div className="card bg-base-300 text-neutral-content w-96 m-8 shadow-sm cursor-pointer" onClick={handleCardClick}>
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

export default UserCard;