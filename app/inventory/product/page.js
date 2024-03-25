"use client";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
export default function Page() {
    const searchParams = useSearchParams();
    const productid = searchParams.get("product_id");
    const [tool, setTool] = useState(null);
    useEffect(() => {
        fetch("http://localhost:3000/api/tools/tool?product_id=" + productid)
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                setTool(data[0]);
            });
    }, []);

    // Build a page for what the tool should look like instead of the return here
    return (
        <div>
            Tool ID: {tool && tool.Tool_ID} and Tool Name:{" "}
            {tool && tool.Tool_Name}{" "}
        </div>
    );
}
