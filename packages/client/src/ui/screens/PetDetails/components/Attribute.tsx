import { Box, Text, Flex } from '@radix-ui/themes'

type Value = string | number | boolean

interface AttributeProps {
  icon?: string
  label: string
  value?: Value
}

const renderValue = (label: string, value: Value) => {
  if (typeof value === 'boolean') {
    return <Text size="4"> {value ? 'Yes' : 'No'} </Text>
  }

  if (label === 'age') {
    return <Text size="4"> {value} years old </Text>
  }

  return <Text size="4"> {value} </Text>
}

const Attribute = (props: AttributeProps) => {
  if (!props.value) {
    return null
  }

  return (
    <Flex className="justify-between border-b-2 pb-2" gap="1">
      {props.icon && <Box className="invisible rounded-lg overflow-hidden"> {props.icon} </Box>}
      <Text size="4" weight="bold" className="truncate flex flex-1 capitalize">
        {' '}
        {props.label}
      </Text>
      <Text size="4" className="flex flex-1">
        {' '}
        {renderValue(props.label, props.value)}{' '}
      </Text>
    </Flex>
  )
}

export { Attribute }
