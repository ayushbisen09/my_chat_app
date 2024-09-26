import React from 'react';

import { Label } from 'src/components/label';

export default function UnsupportedMessageType() {
  return (
    <Label
      variant="soft"
      color="error"
     
    >
      Unsupported message received
    </Label>
  );
}
