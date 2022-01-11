import { useRecoilState } from "recoil";
import { TodoType } from "../../../../../redux-toolkit/src/utils/types";
import { stateTodoList } from "../../../recoil/atom/todoList.atom";
import { removeItemAtIndex } from "../../../utils/removeItemAtIndex";
import { replaceItemAtIndex } from "../../../utils/replaceItemAtIndex";

type TodoItemProps = {
  item: TodoType;
};

function TodoItem({ item }: TodoItemProps) {
  const [todoList, setTodoList] = useRecoilState(stateTodoList);
  const index = todoList.findIndex((listItem) => listItem.id === item.id);
  console.log("TodoItem todoList: ", todoList);
  console.log("TodoItem item: ", item);

  const editItemText = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newList = replaceItemAtIndex(todoList, index, {
      ...item,
      text: e.target.value,
    });

    setTodoList(newList);
  };

  const toggleItemCompletion = () => {
    const newList = replaceItemAtIndex(todoList, index, {
      ...item,
      isComplete: !item.isComplete,
    });

    setTodoList(newList);
  };

  const deleteItem = () => {
    const newList = removeItemAtIndex(todoList, index);

    setTodoList(newList);
  };

  return (
    <div>
      <input type="text" value={item.text} onChange={editItemText} />
      <input
        type="checkbox"
        checked={item.isComplete}
        onChange={toggleItemCompletion}
      />
      <button onClick={deleteItem}>X</button>
    </div>
  );
}

export default TodoItem;
