# Alternative: A Generic "get" Function
### As always, there are, of course, multiple ways of building the `get` function.

### You could, for example, also build it as a generic function that accepts the expected return value type as a type argument:

```js
export const get = async <T>(url:string) => {
  const response = await fetch(url)
 
  if (!response.ok) throw new Error('Failed to fetch data.')
 
  const data = await response.json() as unknown 
  return data as T
}
```

### Now the "Type Casting" ("Type Assertion") takes place right inside the get function to "force" TypeScript to treat data as type `T`.

### `T` is then set when calling get:

```js
const data = await get<RawDataBlogPost[]>('https://jsonplaceholder.typicode.com/posts')
```

### This allows you to use `get()` without having to cast the type to the expected value type.

### It's of course up to you, whether you prefer this approach whether the approach shown in the videos.

## Level-up: Use with Zod

### You can also take this to the next level when using [Zod](https://zod.dev/) (see previous lecture).

### You can adjust the `get` function to accept a second parameter that could be called `zodSchema` and should be a Zod schema object (of type `ZodType`).

### This Zod schema can then be used inside the `get` function to parse the received response.

```js
import {z} from 'zod'
 
export async function get<T>(url:string, zodSchema:z.ZodType<T>) {
  const response = await fetch(url)
 
  if (!response.ok) throw new Error('Failed to fetch data.')
 
  const data = (await response.json()) as unknown
 
  try {
    return zodSchema.parse(data)
  } catch (error) {
    throw new Error('Invalid data received from server.')
  }
}
```

### Since Zod would throw an error if parsing the data fails, TypeScript knows that if it succeeds, the data will be a value of the type defined by the Zod schema (i.e., TypeScript will narrow the type to be of that type).

### Therefore, no more type casting is needed anywhere. Instead, in the place where `get()` should be called, you just need to define a Zod schema that describes the expected type and pass it to `get()`.

```js
import {z} from 'zod'

const rawDataBlogPostSchema = z.object({
  id: z.number(),
  userId: z.number(),
  title: z.string(),
  body: z.string()
})
 
const data = await get('https://jsonplaceholder.typicode.com/posts', z.array(rawDataBlogPostSchema))
 
data[0].userId  // TypeScript knows that userId will exist on the returned data
