import { Flex, Text, Box } from '@radix-ui/themes'
import { Button } from 'src/ui/design-system/Button'
import { useAppSelector } from 'src/config/store'
import { Avatar } from 'src/ui/design-system/Avatar'
import { selectUser } from 'src/config/store/slices'
import { Bars3Icon } from '@heroicons/react/20/solid'
import { ModalConfirmCreateShelter } from './ModalConfirmCreateShelter'
import { ExitIcon } from '@radix-ui/react-icons'

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerTrigger,
} from 'src/ui/design-system/Drawer'
import { useAuth } from 'src/utils/hooks/useAuth'

const UserDrawer = () => {
  const userProps = useAppSelector(selectUser)

  const [_, actions] = useAuth()

  return (
    <Drawer direction="right">
      <DrawerTrigger asChild>
        <Button
          variant="roundedWhite"
          className="w-fit h-[48px] text-yellow-950 border-yellow-950 bg-white"
        >
          <Flex gap="2" align="center">
            <Bars3Icon className="text-sm" height="20px" />
            <Text> {userProps?.email}</Text>
            <Avatar src={userProps?.photoURL || ''} />
          </Flex>
        </Button>
      </DrawerTrigger>
      <DrawerContent className="bg-white flex flex-col rounded-t-[10px] h-full w-[400px] mt-24 fixed bottom-0 right-0">
        <Box p="5">
          <Flex direction="column" justify="center" gap="4">
            <Avatar src={userProps?.photoURL || ''} />
            <Text>{userProps.name}</Text>
            <Text>{userProps.email}</Text>
          </Flex>
          <Flex direction="column" justify="center" gap="4">
            <ModalConfirmCreateShelter />
          </Flex>
        </Box>
        <DrawerFooter>
          <DrawerClose asChild>
            <Button className="flex gap-3">Close</Button>
          </DrawerClose>
          <Button onClick={actions.logout} variant="outline" className="flex gap-3">
            <ExitIcon /> Log out
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}

export { UserDrawer }
