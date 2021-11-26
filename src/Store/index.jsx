import { configureStore } from "@reduxjs/toolkit";
import KanbanReducer from "./kanban/index";

export const store = configureStore({
  reducer: {
    kanban: KanbanReducer,
  },
});
