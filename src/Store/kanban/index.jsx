import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  column: [
    {
      icon: "📋",
      name: "To Do",
      id: "1",
      color: "#5CC4FF",
      cards: [
        {
          name: "Ajustar fluxo de compras",
          id: "12",
          tags: [
            {
              name: "Tag1",
              id: "21",
            },
          ],
        },
      ],
    },
    {
      icon: "📋📋",
      name: "To Do Again",
      id: "2",
      color: "#5CC4FF",
      cards: [
        {
          name: "Ajustar Aquele treco la",
          id: "122",
          tags: [
            {
              name: "Tag2",
              id: "221",
            },
          ],
        },
      ],
    },
  ],
};
const KanbanReducer = createSlice({
  name: "kanban",
  initialState: initialState,
  reducers: {
    SaveCards(state, action) {
      state = action.payload;
    },
  },
});

export const { SaveCards } = KanbanReducer.actions;
export default KanbanReducer.reducer;
