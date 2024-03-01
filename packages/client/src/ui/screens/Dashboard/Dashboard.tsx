import React from 'react';
import { Box } from '~components/Box';
import { Text } from '~components/Text';

export default function Dashboard() {
  return (
    <Box display='flex' justifyContent='center'>
      <Text
        truncate="noEllipsis"
        tone="black"
        weight="medium"
        size="xlarge"
      >
        dashboard
      </Text>
    </Box>
  );
}
