import { _mock } from './_mock';

// ----------------------------------------------------------------------

const ITEMS = [...Array(3)].map((_, index) => ({
  id: _mock.id(index),
}));

export const _quickreplies = [...Array(20)].map((_, index) => {
  const items = (index % 2 && ITEMS.slice(0, 1)) || (index % 4 && ITEMS.slice(1, 3)) || ITEMS;

  return {
    id: _mock.id(index),
    quickReplies: '',
    items,
  };
});
// import { _mock } from './_mock';

// ----------------------------------------------------------------------
