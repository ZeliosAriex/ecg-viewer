import { type ReactNode } from 'react'

import { HeaderComponent } from '@/components'

interface MainLayoutProps {
  children: ReactNode
}
const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <>
      <HeaderComponent />
      {children}
    </>
  )
}

export default MainLayout
