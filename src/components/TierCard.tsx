type TierCardProps = {
  value: string;
  selected: boolean;
  onClick: (value: string) => void;
}

const TierCard = ({ value, selected, onClick }: TierCardProps) => {
  return (
    <div
      className={`card px-6 py-10 cursor-pointer flex items-center justify-center ${selected ? `bg-blue-700 text-white` : `bg-base-200`}`}
      onClick={() => onClick(value)}
    >
      <h3 className="text-xl font-semibold">{value}</h3>
    </div>
  );
};

export default TierCard;