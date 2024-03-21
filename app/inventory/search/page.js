'use client'
import { useSearchParams } from "next/navigation"
export default function Page() {

    const searchParams = useSearchParams()
    const categoryName = searchParams.get('search')

    return <div>Search term: {categoryName}</div>
}