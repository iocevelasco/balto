import { useTranslation } from 'react-i18next'
import { PetList } from './components/petsList'
import { Flex } from '@radix-ui/themes'
import { HeroBanner } from 'src/ui/components/HeroBanner'
import { SheltersList } from './components/sheltersList'

function HomeScreen() {
  const { t } = useTranslation()

  return (
    <>
      <HeroBanner
        headline={t('home.heroBanner.title')}
        subheading={t('home.heroBanner.subtitle')}
        backgroundImage="https://www.debt.com/es/wp-content/uploads/2020/01/8-Costs-to-Know-Before-Adopting-a-Pet.jpg"
      />
      <Flex
        direction="column"
        gap="3"
        width="100%"
        p={{
          initial: '3',
          md: '5',
          lg: '7',
        }}
      >
        <PetList />
      </Flex>
      <Flex
        direction="column"
        gap="3"
        width="100%"
        p={{
          initial: '3',
          md: '5',
          lg: '7',
        }}
      >
        <SheltersList />
      </Flex>
    </>
  )
}

export { HomeScreen }
