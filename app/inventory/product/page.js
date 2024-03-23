'use client'
import { useSearchParams } from "next/navigation"
export default function Page() {

    const searchParams = useSearchParams()
    const productid = searchParams.get('product_id')

    return <div>Product ID: {productid}</div>
}