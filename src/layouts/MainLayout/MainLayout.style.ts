import { Box, css, styled } from '@mui/material'

export const Container = styled(Box)(
  ({ theme }) => css`
    display: flex;
    height: 100%;
    width: 100%;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    padding: ${theme.spacing(2, 2, 5.5)};
  `
)

