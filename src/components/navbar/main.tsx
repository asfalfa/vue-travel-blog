import Link from "next/link";
import NavbarMenu from "./menu";

export default function Navbar(){

    return (
        <div className="top-0 fixed z-50 w-full bg-white border-b border-solid border-neutral-500 px-2 py-1 flex flex-row justify-evenly">
            <div className="flex items-center font-bold text-xl">
                <Link href="/" className="hover:text-neutral-700">A Travel Blog</Link>
                -
                <Link href="/posts/new" className="hover:text-neutral-700">New Post</Link>
            </div>
            <NavbarMenu></NavbarMenu>
        </div>
    )
}