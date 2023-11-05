import type {ComponentPropsWithoutRef, FC} from 'react'

type AnchorProps = {
  el:'anchor'
} & ComponentPropsWithoutRef<'a'>  // Merge with props for <a>

type ButtonProps = {
  el:'button'
} & ComponentPropsWithoutRef<'button'>  // Merge with props for <button>

const Button1:FC<AnchorProps | ButtonProps> = props => {
  // const {el, ...otherProps} = props  // TS does not yet know if 'otherProps' is for <a> or <button>

  if (props.el === 'anchor') {
    // TS now knows 'props' is of type 'AnchorProps' because of type check
    return <a className='button' {...props}></a>
  }

  // TS now knows 'props' is of type 'ButtonProps'
  return <button className='button' {...props}></button>
}

export default Button1
