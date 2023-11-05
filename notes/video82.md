# Alternative: Using the "zod" Library for Response Data Validation
### When fetching data, it can be a good idea to parse & validate the fetched data to check if it's in line with your data structure expectations.

### A great library for doing that validation is the [Zod](https://zod.dev/) library because this library embraces TypeScript and is written such that TypeScript is able to infer the structure of the parsed/validated data.

### I could create an entire course about Zod, but here's a very brief introduction.

### When working with Zod (after installing it via `npm install zod`), your main task is to create a schema for the data you're trying to validate.

### For example, when fetching blog posts, you would define the schema for a single blog post:

```js
import {z} from 'zod'
 
const rawDataBlogPostSchema = z.object({
  id:z.number()
  userId:z.number()
  title:z.string()
  body:z.string()
})
```

### __Important__: This is JavaScript code! It will be compiled and will execute at runtime.

### But, under the hood, it's written such that, during development, TypeScript is able to infer the type of the values that will be parsed/validated via that schema.

### Speaking of that, here's how you would use this `rawDataBlogPostSchema` to validate a value:

```js
const parsedData = rawDataBlogPostSchema.parse(someData)
```

### This will throw an error if `someData` is not in line with the defined schema (e.g., if a property is missing or of a different value type).

### It will return the parsed data if validation succeeds.

### The great thing is, that TypeScript now knows the type of `parsedData`: It will be the type you set up in your schema.

### In this example, TypeScript would know that `parsedData` contains the properties `id` (number), `userId` (number), `title` (string) and `body` (string).

### Therefore, even if `someData` was `any` or `unknown`, `parsedData` will be a known type.

### When using Zod in the course demo app, you could therefore adjust the `App` component file like this:

```js
import {z} from 'zod'
// Other imports ...
 
// Outside of App component function (since this doesn't need to be re-created all the time)
const rawDataBlogPostSchema = z.object({
  id:z.number()
  userId:z.number()
  title:z.string()
  body:z.string()
})

// z.array() is a Zod method that creates a new schema based on another schema.
// As the name suggests, it's simply an array containing the expected objects.

const expectedResponseDataSchema = z.array(rawDataBlogPostSchema)
 
const App = () => {
  // Other code like useState() etc ...
 
  useEffect(() => {
    const fetchPosts = async () => {
      setIsFetching(true)

      try {
        const data = await get(
          'https://jsonplaceholder.typicode.com/posts'
        )
        const parsedData = expectedResponseDataSchema.parse(data)

        // No more type casting via 'as' needed. Instead, here, TypeScript knows that
        // parsedData will be an array full of objects as defined by the above schema.

        const blogPosts:BlogPost[] = parsedData.map(rawPost => ({
          id: rawPost.id,
          title: rawPost.title,
          text: rawPost.body
        })

        setFetchedPosts(blogPosts)
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message)
        }
        // setError('Failed to fetch posts!');
      }
 
      setIsFetching(false)
    }
 
    fetchPosts()
  }, [])
 
  // Other code ...
}
```
