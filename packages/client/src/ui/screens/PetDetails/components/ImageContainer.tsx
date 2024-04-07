import { Box } from '@radix-ui/themes'

interface ImageContainerProps {
  alt: string
  src: string
}

const ImageContainer = (props: ImageContainerProps) => {
  return (
    <Box className="rounded-lg overflow-hidden">
      <img src={props.src} alt={props.alt} className="object-fit" />
    </Box>
  )
}

export { ImageContainer }
