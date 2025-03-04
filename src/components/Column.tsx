import { Column as ColumnType } from "@/types/Column"
import { UserDB } from "@/types/UserDB";

type ColumnProps = {
  column: ColumnType;
  user?: UserDB;
}

const Column = ({ column, user }: ColumnProps) => {
  return (
    <div className="flex w-80 flex-col rounded-md bg-base-100 p-4">
      <h2 className="mb-4 font-semibold">{column.title}</h2>
      <div className="flex flex-1 flex-col gap-4">

      </div>
    </div>
  );
};


export default Column;