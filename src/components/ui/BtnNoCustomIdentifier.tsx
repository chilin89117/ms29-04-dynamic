import type {ComponentPropsWithoutRef, FC} from 'react'

type AnchorProps = ComponentPropsWithoutRef<'a'> & {href?:string}  // 'href' prop is optional for <a>

type ButtonProps = ComponentPropsWithoutRef<'button'> & {href?:never}  // <button> does not have 'href' prop

// Type predicate: add additional info instead of just returning boolean
const isAnchor = (props:AnchorProps|ButtonProps):props is AnchorProps => 'href' in props

const Button2:FC<AnchorProps | ButtonProps> = props => {
  // TS does not know 'props' is of type 'AnchorProps' if isAnchor() only returns a boolean
  if (isAnchor(props)) {
    return <a className='button' {...props}></a>
  }

  // TS still does not know 'props' is of type 'ButtonProps'
  return <button className='button' {...props}></button>
}

export default Button2
