import type {ComponentPropsWithoutRef, FC} from 'react'

type InputProps = {
  label:string
  id:string
} & ComponentPropsWithoutRef<'input'>  // Merge custom props with default props for input element

const Input:FC<InputProps> = ({label, id, ...props}) => {
  return (
    <p>
      <label htmlFor={id}>{label}</label>
      <input id={id} {...props} />
    </p>
  )
}

export default Input
