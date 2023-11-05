import {useRef} from 'react'
import Input from './components/ui/Input.tsx'
import Button1 from './components/ui/BtnCustomIdentifier.tsx'
import Button2 from './components/ui/BtnNoCustomIdentifier.tsx'
import Container from './components/ui/Container.tsx'
import Card from './components/ui/Card.tsx'
import IconButton from './components/ui/IconButton.tsx'
import GenericList from './components/ui/GenericList.tsx'
import InputRef from './components/ui/InputRef.tsx'
import Form from './components/ui/Form.tsx'
import FormApi, {type FormHandle} from './components/ui/FormApi.tsx'

const HeartIcon = () => <span>❤️</span>  // video 56

const users = [  // video 56
  {id: 'u1', name: 'Max'},
  {id: 'u2', name: 'Manuel'}
]

const hobbies = ['Sports', 'Reading', 'Cooking']  // video 56

const App = () => {
  const inputRef = useRef<HTMLInputElement>(null)  // video 57

  const formApiRef = useRef<FormHandle>(null)  // Type contains clearInputs() video 61

  const handleSave = (data:unknown) => {  // video 59
    // Let TS know what type of data <form> has
    const extractedData = data as {  // <InputRef> has 'name' attrib set to 'id'
      formname:string
      formage:string
    }
  
    console.log('Using type casting:', extractedData)
  
    // Alternatively, use type guards for type narrowing
    if (!data || typeof data !== 'object' || !('formname' in data) || !('formage' in data)) return
   
    // At this point, TypeScript knows that data MUST BE an object with 'name' and 'age' properties;
    // otherwise the previous if statement would have returned
    console.log('Using type guard:', data)

    formApiRef.current?.clearInputs()  // video 61
  }

  return (
    <main>
      <h2>Inputs</h2>
      <Input id='name' label='Your Name' type='text' />
      <Input id='age' label='Your Age' type='number' />

      <hr />
      <h2>Buttons</h2>
      <p>
        <Button1 el='anchor' href='https://google.com'>Link 1</Button1>
        <Button1 el='button'>Button 1</Button1>
      </p>
      
      <p>
        {/* 'href' is a string so 'disabled' prop is not allowed for <a> */}
        <Button2 href='https://google.com'>Link 2</Button2>
        {/* TS still allows 'target' because absence of 'href' is not enough to deduct that it's a button */}
        <Button2 target='_blank'>Button 2</Button2>
      </p>

      <hr />
      <h2>Container</h2>
      <Container as={Button2} onClick={() => console.log('Button clicked!')} type='button'>Video 55</Container>

      <hr />
      <Card
        title='My Card'
        actions={<button className='button' onClick={() => console.log('Card button clicked!')}>Card Button</button>}
      >
        <p>Some content</p>
      </Card>

      <hr />
      <h2>Button with Icon</h2>
      <IconButton
        className='button'
        icon={HeartIcon}
        onClick={() => console.log('IconButton clicked!')}
      >
        Icon Button
      </IconButton>

      <hr />
      {/* Array of objects */}
      <h2>List of Users</h2>
      <GenericList
        items={users}
        renderItem={user => <li key={user.id}>{user.name}</li>}
      />
      {/* Array of strings */}
      <h2>List of Hobbies</h2>
      <GenericList
        items={hobbies}
        renderItem={hobby => <li key={hobby}>{hobby}</li>}
      />

      <hr />
      <h2>Input with Ref</h2>
      <InputRef label='Test' id='test' ref={inputRef} />

      <hr />
      <h2>Form</h2>
      <Form onSave={handleSave}>
        <InputRef id='formname' label='Form Name' type='text' />
        <InputRef id='formage' label='Form Age' type='number' />
        <p>
          <Button1 el='button' type='submit'>Save</Button1>
        </p>
      </Form>

      <hr />
      <h2>Form API</h2>
      <FormApi onSave={handleSave} ref={formApiRef}>
        <InputRef id='formname' label='Form Name' type='text' />
        <InputRef id='formage' label='Form Age' type='number' />
        <p>
          <Button1 el='button' type='submit'>Save</Button1>
        </p>
      </FormApi>

      <hr /><hr />
      
    </main>
  )
}

export default App
