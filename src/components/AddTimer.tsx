import {useRef} from 'react'
import {useTimersContext} from '../hooks/useTimersCtx.ts'
import Button from './ui/BtnNoCustomIdentifier.tsx'  // Section 4
import Form, {FormHandle} from './ui/FormApi.tsx'  // Section 4
import Input from './ui/Input.tsx'  // Section 4

const AddTimer = () => {
  const {addTimer} = useTimersContext()

  const form = useRef<FormHandle>(null)

  const handleSaveTimer = (data:unknown) => {
    const extractedData = data as {name:string, duration:string}
    addTimer({name: extractedData.name, duration: +extractedData.duration})  // Convert 'duration' to number type
    form.current?.clearInputs()
  }

  return (
    <Form ref={form} onSave={handleSaveTimer} id='add-timer'>
      <Input type='text' label='Name' id='name' name='name' />
      <Input type='number' label='Duration' id='duration' name='duration' />
      <p>
        <Button>Add Timer</Button>
      </p>
    </Form>
  )
}

export default AddTimer
