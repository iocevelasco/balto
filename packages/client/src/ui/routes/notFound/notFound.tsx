import { Flex } from '@radix-ui/themes'
import { Link } from 'react-router-dom'
import { Button } from 'src/ui/design-system/Button'
import { UnauthenticatedApp } from 'src/ui/layouts/UnauthenticatedApp'
import { routes } from 'src/utils/constants/routes'

const NotFound = () => {
  return (
    <UnauthenticatedApp>
      <Flex className="flex justify-center items-center h-screen text-2xl text-gray-800 font-bold">
        404 - Page Not Found
        <Link to={routes.public.home}>
          <Button>Go Home</Button>
        </Link>
      </Flex>
    </UnauthenticatedApp>
  )
}

export { NotFound }
