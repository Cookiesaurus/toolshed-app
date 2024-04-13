import Link from 'next/link'
import Navbar from '@/components/Navbar/Navbar'
export default function NotFound() {
  return (
    <>
    <Navbar/>
    <div>
      <h2>404: Page Not Found</h2>
      <p>They page you are looking for could not be found</p>
      <Link href="/">Return Home</Link>
    </div>
    </>
  )
}