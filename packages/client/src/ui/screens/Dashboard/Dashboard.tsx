import React from 'react'
import { Box } from 'src/ui/design-system/Box'
import { Text } from 'src/ui/design-system/Text'
import { Button } from 'src/ui/design-system/Button'
import { UnauthenticatedApp } from 'src/ui/layouts/UnauthenticatedApp'

function Dashboard() {
  return (
    <UnauthenticatedApp>
      <Box display="flex" flexGrow="1" justifyContent="center">
        <Text truncate="noEllipsis" tone="black" weight="medium" size="xlarge">
          dashboard
        </Text>
        <form>
          <input type="text" />
          <Button type="submit">submit</Button>
        </form>
      </Box>
    </UnauthenticatedApp>
  )
}

export { Dashboard }
