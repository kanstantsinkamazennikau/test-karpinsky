import { UserTreeNode } from "../../api/userTree";
import { ListItem } from "../ListItem";
import "./style.scss";

type ListProps = {
  list: UserTreeNode[] | undefined;
};

export const List: React.FC<ListProps> = ({ list }) => {
  return (
    <div className="tree-node">
      {list?.map((listItem) => (
        <ListItem key={listItem.name} listItem={listItem} />
      ))}
    </div>
  );
};
