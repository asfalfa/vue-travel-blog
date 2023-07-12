import Link from "next/link"

export default function NavbarMenu() {
    return(
        <div className="flex items-center md:space-x-5 border border-neutral-300 rounded-b-lg bg-background p-1">
            <Link href="/archive">Archive</Link>
        </div>
    )
}