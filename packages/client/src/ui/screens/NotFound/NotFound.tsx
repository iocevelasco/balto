import { Flex } from '@radix-ui/themes'
import { Link } from 'react-router-dom'
import { Button } from 'src/ui/design-system/Button'

const NotFound = () => {
  return (
    <Flex className="flex justify-center items-center h-screen text-2xl text-gray-800 font-bold">
      404 - Page Not Found
      <Link to="/">
        <Button>Go Home</Button>
      </Link>
    </Flex>
  )
}

export { NotFound }
