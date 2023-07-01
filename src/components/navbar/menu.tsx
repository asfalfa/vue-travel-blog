import {
    Menubar,
    MenubarContent,
    MenubarItem,
    MenubarMenu,
    MenubarSeparator,
    MenubarShortcut,
    MenubarTrigger,
  } from "../../../@/components/ui/menubar"

export default function NavbarMenu() {
    return(
        <Menubar className="flex items-center md:space-x-5 border border-neutral-300 rounded-b-lg bg-background p-1">
            <MenubarMenu>
                <MenubarTrigger className="flex cursor-pointer rounded-b-sm px-3 py-1.5 text-sm font-medium data-[state=open]:bg-neutral-300">Projects</MenubarTrigger>
                <MenubarContent className="bg-white border rounded-b-lg border-neutral-300">
                    <MenubarItem>
                        New Tab <MenubarShortcut>⌘T</MenubarShortcut>
                    </MenubarItem>
                    <MenubarItem>New Window</MenubarItem>
                    <MenubarSeparator />
                    <MenubarItem>Share</MenubarItem>
                    <MenubarSeparator />
                    <MenubarItem>Print</MenubarItem>
                </MenubarContent>
            </MenubarMenu>
            <MenubarMenu>
                <MenubarTrigger className="flex cursor-pointer rounded-b-sm px-3 py-1.5 text-sm font-medium data-[state=open]:bg-neutral-300">Archive</MenubarTrigger>
                <MenubarContent className="bg-white border rounded-b-lg border-neutral-300">
                    <MenubarItem>
                        New Tab <MenubarShortcut>⌘T</MenubarShortcut>
                    </MenubarItem>
                    <MenubarItem>New Window</MenubarItem>
                    <MenubarSeparator />
                    <MenubarItem>Share</MenubarItem>
                    <MenubarSeparator />
                    <MenubarItem>Print</MenubarItem>
                </MenubarContent>
            </MenubarMenu>
            <MenubarMenu>
                <MenubarTrigger className="flex cursor-pointer rounded-b-sm px-3 py-1.5 text-sm font-medium data-[state=open]:bg-neutral-300">Store</MenubarTrigger>
                <MenubarContent className="bg-white border rounded-b-lg border-neutral-300">
                    <MenubarItem>
                        New Tab <MenubarShortcut>⌘T</MenubarShortcut>
                    </MenubarItem>
                    <MenubarItem>New Window</MenubarItem>
                    <MenubarSeparator />
                    <MenubarItem>Share</MenubarItem>
                    <MenubarSeparator />
                    <MenubarItem>Print</MenubarItem>
                </MenubarContent>
            </MenubarMenu>
        </Menubar>
    )
}