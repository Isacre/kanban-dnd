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
          name: "Documentar padrões mobile",
          id: "13323232",
          tags: [
            {
              name: "Tag 1",
              id: "2331",
            },
          ],
        },
        {
          name: "Ajustar fluxo de compra",
          id: "11332312",
          tags: [
            {
              name: "Tag 1",
              id: "2111",
            },
          ],
        },
        {
          name: "Banners da home",
          id: "1412412",
          tags: [
            {
              name: "Tag 1",
              id: "24124141",
            },
          ],
        },
        {
          name: "Template de e-mail marketing",
          id: "124124",
          tags: [
            {
              name: "Tag 1",
              id: "412421",
            },
          ],
        },
      ],
    },
    {
      icon: "💻",
      name: "In progress",
      id: "2",
      color: "#945AD1",
      cards: [
        {
          name: "Wireframe das telas",
          id: "12312",
          tags: [
            {
              name: "Tag 2",
              id: "2131231",
            },
          ],
        },
      ],
    },
    {
      icon: "🚀",
      name: "Done",
      id: "3",
      color: "#59D090",
      cards: [
        {
          name: "Implementação do blog",
          id: "12",
          tags: [
            {
              name: "Tag 3",
              id: "21",
            },
          ],
        },
        {
          name: "Análise de métricas",
          id: "12",
          tags: [
            {
              name: "Tag 3",
              id: "21",
            },
          ],
        },
        {
          name: "UX Review",
          id: "12",
          tags: [
            {
              name: "Tag 3",
              id: "21",
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
    NewColumn(state, action) {
      state.column.push(action.payload);
    },
    NewCard(state, action) {
      const { payload } = action;
      const { index, card } = payload;
      state.column[index].cards.push(card);
    },
    NewTag(state, action) {
      const { payload } = action;
      const { columnindex, cardindex, tag } = payload;
      state.column[columnindex].cards[cardindex].tags.push(tag);
    },
  },
});

export const { SaveCards, NewColumn, NewCard, CardName, NewTag } =
  KanbanReducer.actions;
export default KanbanReducer.reducer;
