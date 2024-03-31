import type { MotionProps } from 'framer-motion'
import { AnimatePresence, motion } from 'framer-motion'
import { Spinner } from './Spinner'

const SPINLOADER_ANIMATION_PROPS: MotionProps = {
  animate: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.9 },
  initial: { opacity: 0, scale: 0.9 },
  transition: { duration: 0.3, ease: 'easeOut' },
}

function SpinLoader() {
  return (
    <AnimatePresence>
      <motion.div
        style={{
          alignItems: 'center',
          display: 'flex',
          height: '100%',
          justifyContent: 'center',
          width: '100%',
        }}
        {...SPINLOADER_ANIMATION_PROPS}
      >
        <Spinner size="large" tone="brandAccent" />
      </motion.div>
    </AnimatePresence>
  )
}

function FullScreenSpinLoader() {
  return (
    <div style={{ height: '100vh', width: '100vw' }}>
      <SpinLoader />
    </div>
  )
}

export { FullScreenSpinLoader, SpinLoader }
