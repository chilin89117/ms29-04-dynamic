// Example: A Card component that has multiple 'slots' for content (video 56)
// Main slot => children prop
// Actions slot => actions prop

import type {FC, PropsWithChildren, ReactNode} from 'react'

type CardProps = {
  title:string
  // 'actions' is like an extra 'slot' of this component
  // It's the same type as the children prop, since we expect JSX code as a prop value
  actions:ReactNode
}

const Card:FC<PropsWithChildren<CardProps>> = ({title, children, actions}) => (
  <section>
    <h2>{title}</h2>
    {children}
    {actions}
  </section>
)

// Example usage (see App.tsx)
// const Demo = () => (
//   <Card
//     title='My Card'
//     actions={<button onClick={() => console.log('Card button clicked!')}>Card Button</button>}
//   >
//     <p>Some content</p>
//   </Card>
// )

export default Card
