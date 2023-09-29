import { Box, Button, Divider, Stack, Typography } from '@mui/material'

import { LineGraph } from '@/features/ecg/components'
import { useEcg } from '@/features/ecg/hooks'

const EcgGraph = () => {
  const { data, domain, nextDomain, prevDomain } = useEcg()

  return (
    <Box marginTop={4}>
      <Typography variant='h2' gutterBottom>
        Electrocardiogram Graph
      </Typography>

      <LineGraph data={data} domain={domain} />

      <Stack
        direction='row'
        justifyContent='center'
        spacing={2}
        divider={<Divider orientation='vertical' flexItem />}
      >
        <Button onClick={prevDomain}>Prev</Button>
        <Button onClick={nextDomain}>Next</Button>
      </Stack>
    </Box>
  )
}

export default EcgGraph
