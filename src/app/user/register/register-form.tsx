'use client'

export default function RegisterForm() {

    const handleSubmit = async (event) => {
        // Stop the form from submitting and refreshing the page.
        event.preventDefault()
     
        // Get data from the form.
        const data = {
            email: event.target.email.value,
            password: event.target.password.value,
        }
     
        const response = await fetch('http://localhost:3000/api/users', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
          })

        // Get the response data from server as JSON.
        // If server returns the name submitted, that means the form works.
        const result = await response.json()
        alert(result.success)
    }

  return (
      <form onSubmit={handleSubmit} className='flex flex-col'>
        <label htmlFor="email">Email</label>
        <input
            className='border border-neutral-300'
            type="text"
            id="email"
            name="email"
            required
        />

        <label htmlFor="password">Password</label>
        <input
            className='border border-neutral-300'
            type="text"
            id="password"
            name="password"
            required
        />

        <button type="submit" className="rounded-b-sm mt-2 mx-auto w-[300px] p-5 hover:bg-neutral-300">
            Register
        </button>
      </form>
  )
}