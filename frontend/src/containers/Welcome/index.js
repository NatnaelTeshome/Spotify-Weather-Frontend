import React from 'react'
import {
  Background, Container, StyledH1, StyledLink
} from './styles'

const Welcome = () => {
  return (
    <Background>
      <Container>
        <StyledH1>Text / name of our App</StyledH1>
        {/* <StyledIcon icon={}></StyledIcon> */}
        <StyledLink to="/login">Log in</StyledLink>
        <StyledLink to="/register">Create an account</StyledLink>
      </Container>
    </Background>
  )
}
export default Welcome
