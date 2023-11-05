import {useRef} from 'react'
import type {ComponentPropsWithoutRef, FC, FormEvent, PropsWithChildren} from 'react'

type FormProps = ComponentPropsWithoutRef<'form'> & {
  onSave: (value:unknown) => void  // Wrapper component does not know types of data
}

const Form:FC<PropsWithChildren<FormProps>> = ({onSave, children, ...otherProps}) => {
  const formRef = useRef<HTMLFormElement>(null)

  const handleSubmit = (e:FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const formData = new FormData(e.currentTarget)  // Built-in browser JS to gather all inputs into 'formData'
    const data = Object.fromEntries(formData)  // Convert from FormData type to JS object

    onSave(data)

    formRef.current?.reset()
  }

  return (
    <form onSubmit={handleSubmit} {...otherProps} ref={formRef}>
      {children}
    </form>
  )
}

export default Form
