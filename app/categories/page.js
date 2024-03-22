'use client'
import { useSearchParams } from "next/navigation"
export default function Page() {

    const searchParams = useSearchParams()
    const categoryName = searchParams.get('category_name')

    return <div>My Post: {categoryName}</div>
}