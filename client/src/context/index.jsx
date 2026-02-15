import { createContext } from "react";

const EventContext = createContext({
  user: "",
  loginUser: () => {},
});
export default EventContext;
