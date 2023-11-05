import {forwardRef, useImperativeHandle, useRef} from 'react'
import type {ComponentPropsWithoutRef, FormEvent} from 'react'

type FormProps = ComponentPropsWithoutRef<'form'> & {
  onSave: (value:unknown) => void  // Wrapper component does not know types of 'value'
}

// Describe object returned by useImperativeHandle()
export type FormHandle = {
  clearInputs:() => void
}

const FormApi = forwardRef<FormHandle, FormProps>(({onSave, children, ...props}, ref) => {
  const formRef = useRef<HTMLFormElement>(null)

  // Expose callable function (API) to App.tsx
  useImperativeHandle(ref, () => {
    return {
      clearInputs() {
        console.log('Clear inputs from <FormApi>')
        formRef.current?.reset()
      }
    }
  })

  const handleSubmit = (e:FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const formData = new FormData(e.currentTarget)  // Built-in browser JS to gather all inputs into 'formData'
    const data = Object.fromEntries(formData)  // Convert from FormData type to JS object

    onSave(data)
  }

  return (
    <form onSubmit={handleSubmit} {...props} ref={formRef}>
      {children}
    </form>
  )
})

export default FormApi
