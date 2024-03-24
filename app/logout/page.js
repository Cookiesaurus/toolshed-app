import { logout } from "@/actions/actions"
export default function Page() {
    return(
        <>
        <form action={logout}>
            <button>Logout</button>
        </form>
        </>
    )
}
