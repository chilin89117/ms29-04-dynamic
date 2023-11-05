// Example: A Generic List Component (Video 56)
// This reusable component can be used to render a list of items of any type.
// The type of the items is passed via a generic type parameter.

import type {FC, ReactNode} from 'react'

type ListProps<T> = {
  items:T[]
  renderItem:(item:T) => ReactNode
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const GenericList:FC<ListProps<any>> = ({items, renderItem}) => (
  <ul>{items.map(renderItem)}</ul>
)

// Example usage (see App.tsx)
// const Demo = () => {
//   const users = [
//     { id: 'u1', name: 'Max' },
//     { id: 'u2', name: 'Manuel' },
//   ]

//   const hobbies = ['Sports', 'Reading', 'Cooking']

//   return (
//     <main>
//       <section>
//         <h2>Users</h2>
//         <GenericList
//           items={users}
//           renderItem={(user) => <li key={user.id}>{user.name}</li>}
//         />
//       </section>
//       <section>
//         <h2>Hobbies</h2>
//         <GenericList
//           items={hobbies}
//           renderItem={(hobby) => <li key={hobby}>{hobby}</li>}
//         />
//       </section>
//     </main>
//   )
// }

export default GenericList
