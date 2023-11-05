// Example: A Button component that has an icon and text (Video 56)
// The icon is passed via a prop which is a function that returns JSX code
import type {ComponentPropsWithoutRef, ElementType, FC, PropsWithChildren} from 'react'

type IconButtonProps = {
  icon:ElementType
  onClick:() => void
} & ComponentPropsWithoutRef<'button'>

// 'icon' is aliased to be a custom component name
const IconButton:FC<PropsWithChildren<IconButtonProps>> = ({icon:Icon, children, ...otherProps}) => (
  <button {...otherProps}>
    <span>
      <Icon />
    </span>
    <span>{children}</span>
  </button>
)

// Example usage (see App.tsx)
// const HeartIcon = () => <span>❤️</span>

// export function Demo() (
//   <IconButton className='button' icon={HeartIcon} onClick={() => console.log('IconButton clicked!')}>
//     Icon Button
//   </IconButton>
// )

export default IconButton
