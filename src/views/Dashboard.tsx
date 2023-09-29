import { Container } from '@mui/material'

import { MainLayout } from '@/components'
import { EcgGraph } from '@/features/ecg/components'

const Dashboard = () => {
  return (
    <MainLayout>
      <Container maxWidth='xl'>
        <EcgGraph />
      </Container>
    </MainLayout>
  )
}

export default Dashboard
