import {type ReactNode, useEffect, useState} from 'react'
import {BlogPostType} from './components/BlogPosts.tsx'
import {get} from './util/http.ts'
import BlogPosts from './components/BlogPosts.tsx'
import fetchingImg from './assets/data-fetching.png'
import ErrorMessage from './components/ErrorMessage.tsx'

type RawPostType = {  // See https://jsonplaceholder.typicode.com/guide/
  id:number
  userId:number
  title:string
  body:string
}

const App = () => {
  const [fetchedPosts, setFetchedPosts] = useState<BlogPostType[]>()  // Initialized to undefined
  const [isFetching, setIsFetching] = useState(false)
  const [error, setError] = useState<string>()  // Initialized to undefined

  useEffect(() => {
    const fetchPosts = async () => {
      setIsFetching(true)

      try {
        const data = (await get('https://jsonplaceholder.typicode.com/posts')) as RawPostType[]

        // Convert RawPostType to BlogPostType
        const blogPosts:BlogPostType[] = data.map(rawPost => ({
          id: rawPost.id,
          title: rawPost.title,
          text: rawPost.body
        }))
        
        setFetchedPosts(blogPosts)
      } catch (err) {
        if (err instanceof Error) setError(err.message)
        else setError('Something went wrong')
      }

      setIsFetching(false)      
    }

    fetchPosts()
  }, [])

  let content:ReactNode

  if (error) content = <ErrorMessage text={error} />

  if (fetchedPosts) content = <BlogPosts posts={fetchedPosts} />  // Avoids 'fetchedPosts' being undefined

  if (isFetching) content = <p id='loading-fallback'>Fetching posts...</p>

  return (
    <main>
      <img src={fetchingImg} alt='fetching image' />

      {content}
    </main>
  )
}

export default App
