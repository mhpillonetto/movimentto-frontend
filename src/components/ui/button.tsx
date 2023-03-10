import styled from 'styled-components'

type ButtonProps = {
  click: any,
  title: string
}

const Button = ({ click, title = "title" }: ButtonProps ) => {
  return (
    <button onClick={() => click()}>{title}</button>
  )
}

const StyledButton = styled(Button)`
  color: blue
`

export default StyledButton
