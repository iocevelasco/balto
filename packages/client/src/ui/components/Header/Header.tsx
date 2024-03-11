import React from 'react'
import { Box } from 'src/ui/design-system/Box'
import { Stack } from 'src/ui/design-system/Stack'
import { Text } from 'src/ui/design-system/Text'

function Header() {
  return (
    <Box
      position="sticky"
      background="brand"
      css={{
        height: '60px',
      }}
    >
      <Stack space="medium">
        <Box display="flex" justifyContent="spaceBetween" alignItems="center"></Box>
        <Text>header</Text>
      </Stack>
    </Box>
  )
}

export { Header }
