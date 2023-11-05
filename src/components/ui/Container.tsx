import type {ComponentPropsWithoutRef, ElementType, FC, PropsWithChildren} from 'react'

// Create generic type to allow ElementType specified by 'as' and not just string or number...
type ContainerProps<T extends ElementType> = {
  as?:T  // Identifier (name) of a component, e.g. 'button', typically lowercase
} & ComponentPropsWithoutRef<T>

// Wrapper component: Assign an alias with uppercase to indicate component
const Container:FC<PropsWithChildren<ContainerProps<ElementType>>> = ({as, children, ...props}) => {
  const Component = as || 'div'  // Alias with uppercase and avoids Component being undefined

  return (
    <Component {...props}>{children}</Component>
  )
}

export default Container
