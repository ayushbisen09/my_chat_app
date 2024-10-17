import { _mock } from './_mock';

// ----------------------------------------------------------------------

export const _chatassignmentrule = [...Array(20)].map((_, index) => ({
  id: _mock.id(index),
  chatAssignmentRules: `#ayu${index}`,
}));
