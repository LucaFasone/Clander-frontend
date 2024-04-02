import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"

function Navbar() {
  return (
    <div className="w-full flex bg-black p-5 flex-row-reverse">
      <ul>
        <NavigationMenu>
            <NavigationMenuList>
              //USE VARIANT HERE 
              <NavigationMenuItem>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>Link1</NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>Link2</NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>Link3</NavigationMenuLink>
              </NavigationMenuItem>
              
            </NavigationMenuList>
          </NavigationMenu>
      </ul>
    </div>
  )
}

export default Navbar