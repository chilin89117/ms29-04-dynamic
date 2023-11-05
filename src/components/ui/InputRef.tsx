// Input component accepting refs (video 57)

import {forwardRef, type ComponentPropsWithoutRef} from 'react'

type InputProps = {
  label:string
  id:string
} & ComponentPropsWithoutRef<'input'>  // Merge custom props with default props for 'input' element

// 'forwardRef()' is generic with HTMLInputElement type for <input>
const InputRef = forwardRef<HTMLInputElement, InputProps>(({label, id, ...props}, ref) => (
  <p>
    <label htmlFor={id}>{label}</label>
    {/* 'name' attribute is required for FormData() */}
    <input id={id} name={id} type='text' {...props} ref={ref} />
  </p>
))

export default InputRef
