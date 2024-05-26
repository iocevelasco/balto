import { Flex } from '@radix-ui/themes'
import { Link } from 'react-router-dom'
import { Button } from 'src/ui/design-system/Button'
import { UnauthenticatedApp } from 'src/ui/layouts/UnauthenticatedApp'
import { LANDING_ROUTES } from 'src/App'

const NotFound = () => {
  return (
    <UnauthenticatedApp>
      <Flex className="flex justify-center items-center h-screen text-2xl text-gray-800 font-bold">
        404 - Page Not Found
        <Link to={LANDING_ROUTES.home}>
          <Button>Go Home</Button>
        </Link>
      </Flex>
    </UnauthenticatedApp>
  )
}

export { NotFound }
