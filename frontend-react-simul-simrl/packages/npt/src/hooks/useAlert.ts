import { useDispatch } from "react-redux";
import { addAlert, removeAlert } from "../store/modules/main/slices";

export const useAlert = () => {
  const dispatch = useDispatch<any>();

  const setAlert = (variant: string, title: string, message: string) => {
    const generateId = (length: number) => {
      const array = new Uint32Array(length);
      window.crypto.getRandomValues(array);
      return Array.from(array, (num) => num.toString(36))
        .join("")
        .slice(0, length);
    };

    const id = generateId(7);

    dispatch(addAlert({ variant, title, message, id }));

    setTimeout(() => {
      dispatch(removeAlert({ id }));
    }, 10000);
  };

  return { setAlert };
};
