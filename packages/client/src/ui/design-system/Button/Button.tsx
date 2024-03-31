import { Button as BaseButton } from '@radix-ui/themes'

type BaseButtonProps = React.ComponentProps<typeof BaseButton>

const Button = (props: BaseButtonProps) => {
  return <BaseButton {...props}>{props.children}</BaseButton>
}

export type { BaseButtonProps }
export { Button }
