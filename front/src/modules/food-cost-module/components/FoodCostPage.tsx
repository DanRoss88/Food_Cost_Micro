import React from 'react'
import { FoodItemList } from './FoodItemList'
import { FoodItemForm } from './FoodItemForm'
import { Container, Box } from '@mui/material'

const FoodCostPage = () => {
  return (
    <div>
        <Container>
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
            <FoodItemForm />
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
            <FoodItemList />
            </Box>
        </Container>
    </div>
  )
}

export default FoodCostPage