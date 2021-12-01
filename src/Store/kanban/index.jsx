import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  column: [
    {
      icon: "📋",
      name: "To Do",
      id: `coluna - ${Math.floor(Math.random() * 101)}`,
      color: "#5CC4FF",
      cards: [
        {
          name: "Documentar padrões mobile",
          id: `card - ${Math.floor(Math.random() * 10991)}`,
          tags: [
            {
              name: "Tag 1",
              id: `tag - ${Math.floor(Math.random() * 10991)}`,
            },
          ],
        },
        {
          name: "Ajustar fluxo de compra",
          id: `card - ${Math.floor(Math.random() * 10991)}`,
          tags: [
            {
              name: "Tag 1",
              id: `tag - ${Math.floor(Math.random() * 10991)}`,
            },
          ],
        },
        {
          name: "Banners da home",
          id: `card - ${Math.floor(Math.random() * 10991)}`,
          tags: [
            {
              name: "Tag 1",
              id: `tag - ${Math.floor(Math.random() * 10991)}`,
            },
          ],
        },
        {
          name: "Template de e-mail marketing",
          id: `card - ${Math.floor(Math.random() * 10991)}`,
          tags: [
            {
              name: "Tag 1",
              id: `tag - ${Math.floor(Math.random() * 10991)}`,
            },
          ],
        },
      ],
    },
    {
      icon: "💻",
      name: "In progress",
      id: `coluna - ${Math.floor(Math.random() * 101)}`,
      color: "#945AD1",
      cards: [
        {
          name: "Wireframe das telas",
          id: `card - ${Math.floor(Math.random() * 10991)}`,
          tags: [
            {
              name: "Tag 2",
              id: `tag - ${Math.floor(Math.random() * 10991)}`,
            },
          ],
        },
      ],
    },
    {
      icon: "🚀",
      name: "Done",
      id: `coluna - ${Math.floor(Math.random() * 10991)}`,
      color: "#59D090",
      cards: [
        {
          name: "Implementação do blog",
          id: `card - ${Math.floor(Math.random() * 10991)}`,
          tags: [
            {
              name: "Tag 3",
              id: `tag - ${Math.floor(Math.random() * 10991)}`,
            },
          ],
        },
        {
          name: "Análise de métricas",
          id: `card - ${Math.floor(Math.random() * 10991)}`,
          tags: [
            {
              name: "Tag 3",
              id: `tag - ${Math.floor(Math.random() * 10991)}`,
            },
          ],
        },
        {
          name: "UX Review",
          id: `card - ${Math.floor(Math.random() * 10991)}`,
          tags: [
            {
              name: "Tag 3",
              id: `tag - ${Math.floor(Math.random() * 10991)}`,
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
    DeleteColumn(state, action) {
      state.column.splice(action.payload, 1);
    },
    DeleteCard(state, action) {
      const { payload } = action;
      const { columnindex, cardindex } = payload;
      state.column[columnindex].cards.splice([cardindex], 1);
    },

    DeleteTg(state, action) {
      const { payload } = action;
      const { columnindex, cardindex, tagindex } = payload;
      state.column[columnindex].cards[cardindex].tags.splice([tagindex], 1);
    },
    MoveCardToColumn(state, action) {
      const { payload } = action;
      const { SourceIndex, DestinationIndex, CardId, ColumnIndex } = payload;
      const sourceColumn = state.column.find(
        (column) => column.id === SourceIndex
      );
      const destinationColumn = state.column.find(
        (column) => column.id === DestinationIndex
      );
      const cardIndex = sourceColumn.cards.findIndex(
        (card) => card.id === CardId
      );
      const transferCard = { ...sourceColumn.cards[cardIndex] };
      sourceColumn.cards.splice(cardIndex, 1);
      destinationColumn.cards.splice(ColumnIndex, 0, transferCard);
    },
    EditColumnName(state, action) {
      const { payload } = action;
      const { NewCard, ColumnIndex } = payload;
      state.column[ColumnIndex].name = NewCard;
    },
    EditCardName(state, action) {
      const { payload } = action;
      const { NewCard, ColumnIndex, CardIndex } = payload;
      state.column[ColumnIndex].cards[CardIndex].name = NewCard;
    },
    ChangeColumnColor(state, action) {
      const { payload } = action;
      const { ColumnIndex, NewColor } = payload;
      state.column[ColumnIndex].color = NewColor;
    },
    ChangeColumnEmoji(state, action) {
      const { payload } = action;
      const { ColumnIndex, NewIcon } = payload;
      state.column[ColumnIndex].icon = NewIcon;
    },
  },
});

export const {
  SaveCards,
  NewColumn,
  NewCard,
  CardName,
  NewTag,
  DeleteColumn,
  DeleteCard,
  DeleteTg,
  MoveCardToColumn,
  EditColumnName,
  EditCardName,
  ChangeColumnColor,
  ChangeColumnEmoji,
} = KanbanReducer.actions;
export default KanbanReducer.reducer;
