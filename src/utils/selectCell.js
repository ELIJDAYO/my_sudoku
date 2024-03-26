export const selectCell = (state, x, y, setSelectedState) => {
    let { board } = state;
    board = board.set('selected', { x, y });
    setSelectedState({ selected: { x, y }, board });
  };

export const getSelectedCell = (state) => {
    const { board } = state;
    const selected = board.get('selected');
    return selected && board.get('puzzle').getIn([selected.x, selected.y]);
};