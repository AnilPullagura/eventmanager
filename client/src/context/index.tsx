import { createContext } from "react";

import { User } from "../types";

interface EventContextType {
  user: null | string;
  loginUser: (userDetails: string) => void;
}

const EventContext = createContext<EventContextType>({
  user: null,
  loginUser: () => {},
});

export default EventContext;
