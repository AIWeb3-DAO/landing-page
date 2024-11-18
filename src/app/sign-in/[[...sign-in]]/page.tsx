import { SignIn } from '@clerk/nextjs'

export default function Page() {
  return (
    <div className='min-h-screen w-full '>
        <p className='text-yellow-400'>hello  world  </p>
  <SignIn />
  </div>
  )
}