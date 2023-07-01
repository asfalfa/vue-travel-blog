import NavbarMenu from "./menu";

export default function Navbar(){

    return (
        <div className="border-b border-solid border-neutral-500  px-2 py-1 flex flex-row justify-evenly">
            <div className="flex items-center">
                <span>A Travel Blog</span>
            </div>
            <NavbarMenu></NavbarMenu>
        </div>
    )
}