"use client";
import ProductItem from "@/components/ProductItem/ProductItem";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import React from "react";
import ToolCard from "@/components/ToolCard/ToolCard";
export default function Page() {
    const searchParams = useSearchParams();
    const categoryName = searchParams.get("category_name");
    const [tools, setTools] = useState([]);
    const [fetched, setFetched] = useState(0);
    useEffect(() => {
        fetch(
            "http://localhost:3000/api/tools/tool?category_name=" +
                categoryName,
            { cache: "no-cache" }
        )
            .then((res) => res.json())
            .then((data) => {
                setTools(data);
                setFetched(1);
            });
    }, []);
    if (fetched == 1) console.log("Data fetched");
    return (
        <>

            <ToolCard tools={tools} />
        </>
    );
}
