import React from 'react';
import { Box } from 'src/ui/design-system/Box';
import { Text } from 'src/ui/design-system/Text';
import { UnauthenticatedApp } from 'src/ui/layouts/UnauthenticatedApp';

function Dashboard() {
  return (
    <UnauthenticatedApp>
      <Box display="flex" flexGrow="1" >
        <Text
          truncate="noEllipsis"
          tone="black"
          weight="medium"
          size="xlarge"
          >
          dashboard
        </Text>
      </Box>
    </UnauthenticatedApp>
  );
}

export {
  Dashboard
}