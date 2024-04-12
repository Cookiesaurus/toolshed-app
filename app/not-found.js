import Link from 'next/link'
 
export default function NotFound() {
  return (
    <div>
      <h2>404: Page Not Found</h2>
      <p>They page you are looking for could not be found</p>
      <Link href="/">Return Home</Link>
    </div>
  )
}