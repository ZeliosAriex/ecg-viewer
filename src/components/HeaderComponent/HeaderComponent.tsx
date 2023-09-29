import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import React from 'react'

const HeaderComponent: React.FC = () => {
  return (
    <AppBar position='static'>
      <Toolbar>
        <Typography variant='h6'>Idoven.ai Coding Challenge</Typography>
      </Toolbar>
    </AppBar>
  )
}

export default HeaderComponent
