'use client'

export default function Form() {

    const handleSubmit = async (event) => {
        // Stop the form from submitting and refreshing the page.
        event.preventDefault()
     
        // Get data from the form.
        const data = {
            title: event.target.title.value,
            author_name: event.target.author_name.value,
            content: event.target.content.value,
            top_image_url: event.target.top_image_url.value,
            bottom_image_url: event.target.bottom_image_url.value,
            date: event.target.date.value,
        }
     
        const response = await fetch('http://localhost:3000/api/posts/new', {
            next: { revalidate: 10 },
            method: 'POST',
            body: JSON.stringify(data),
          })

        // Get the response data from server as JSON.
        // If server returns the name submitted, that means the form works.
        const result = await response.json()
        alert(`Post Created\nTitle: ${result.data.title} \nAuthor: ${result.data.author_name}`)
    }

  return (
      <form onSubmit={handleSubmit} className='flex flex-col'>
        <label htmlFor="title">Title</label>
        <input
            className='border border-neutral-300'
            type="text"
            id="title"
            name="title"
            required
        />

        <label htmlFor="author_name">Author</label>
        <input
            className='border border-neutral-300'
            type="text"
            id="author_name"
            name="author_name"
            required
        />

        <label htmlFor="content">Content</label>
        <textarea
            className='border border-neutral-300'
            id="content"
            name="content"
            required
        />

        <label htmlFor="top_image_url">Top Image URL</label>
        <input
            className='border border-neutral-300'
            type="url"
            id="top_image_url"
            name="top_image_url"
            required
        />
        
        <label htmlFor="bottom_image_url">Bottom Image URL</label>
        <input
            className='border border-neutral-300'
            type="url"
            id="bottom_image_url"
            name="bottom_image_url"
            required
        />

        <label htmlFor="date">Date</label>
        <input
            className='border border-neutral-300'
            type="date"
            id="date"
            name="date"
            required
        />

        <button type="submit" className="rounded-b-sm mt-2 mx-auto w-[300px] p-5 hover:bg-neutral-300">
            Submit
        </button>
      </form>
  )
}