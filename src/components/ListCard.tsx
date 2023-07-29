import { List } from "@prisma/client";
import { CornerDownRight, Edit } from "react-feather";
import { Flag } from "src/components/Flag";

type ListCardProps = {
  list: List;
  editable: boolean;
  onEditClick: () => void;
};

export function ListCard({ list, editable, onEditClick }: ListCardProps) {
  console.log(list);
  return (
    <div className="flex">
      <div>
        <div className="outline outline-1 outline-veryLightBlue rounded p-4">
          <div className="flex gap-x-8 text-2xl">
            <h2 className="font-bold">{list.title}</h2>
            <Flag language={list.language} />
          </div>
          <ul>
            {list.items.map((i) => (
              <li key={`${list.title}-${i}`}>
                <CornerDownRight className="inline mr-1" />
                <span>{i}</span>
              </li>
            ))}
          </ul>
          <ul className="flex justify-end">
            {list.categories.map((c) => (
              <li className="text-base" key={`${list.title}-c-${c}`}>
                #{c}
              </li>
            ))}
          </ul>
        </div>
        {list.reviewNotes &&
          <div className="bg-red p-4 rounded-b">
            <p className="text-lg">Notes from reviewer:</p>
            <p className="text-base">something something</p>
          </div>
        }
      </div>
      {editable && <Edit onClick={onEditClick} className="text-veryLightBlue cursor-pointer inline ml-2" />}
    </div>)
}
