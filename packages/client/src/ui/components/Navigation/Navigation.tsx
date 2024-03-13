import * as React from 'react'

import { createComponentHook } from 'src/utils/types/createComponentHook'
import { useBreakpoint } from 'src/utils/hooks/useBreakpoint'
import { NavbarNavigation as DesktopNavbarNavigation } from './desktop/NavbarNavigation'

const useSidebarNavigation = createComponentHook((props: NavigationProps) => {
  const { breakpoint } = useBreakpoint()
  const activeTab = props.tabs.find((tab) => tab.active === true) ?? props.tabs[0]
  return {
    state: {
      activeTab,
      breakpoint,
    },
  }
})

type NavbarButtonProps = {
  icon: JSX.Element
  name: string
  url: string
  active?: boolean
}

type NavigationProps = {
  tabs: Array<NavbarButtonProps>
}

type NavigationComponentProps = NavigationProps & {
  activeTab: NavbarButtonProps
}

function Navigation(props: NavigationProps) {
  const { state } = useSidebarNavigation(props)

  return <DesktopNavbarNavigation tabs={props.tabs} activeTab={state.activeTab} />
}

export type { NavbarButtonProps, NavigationComponentProps, NavigationProps }
export { Navigation }
