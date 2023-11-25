import main from "./main";
import holder from "./entities/holder";

/*
  Import All Reduces Here
*/
export default {
  [main.slice.name]: main.slice.reducer,
  [holder.slice.name]: holder.slice.reducer,
};
