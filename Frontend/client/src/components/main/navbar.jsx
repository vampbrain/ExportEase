import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useTheme } from 'next-themes'
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import { Home, MessageSquare, BarChart2, User, Moon, Sun } from 'lucide-react'

const ListItem = React.forwardRef(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={`block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground ${className}`}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  )
})
ListItem.displayName = "ListItem"

export default function Navbar() {
  const { theme, setTheme } = useTheme()
  const navigate = useNavigate()

  return (
    <nav className="bg-background border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <Link to="/" className="text-primary font-bold text-xl">CompliancePro</Link>
          </div>
          <div className="flex items-center space-x-4">
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <Link to="/" className={navigationMenuTriggerStyle()}>
                    <Home className="mr-2 h-4 w-4" />
                    Home
                  </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuTrigger>
                    <MessageSquare className="mr-2 h-4 w-4" />
                    Compliance Chatbot
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                      <li className="row-span-3">
                        <NavigationMenuLink asChild>
                          <Link
                            className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                            to="/compliance"
                          >
                            <MessageSquare className="h-6 w-6" />
                            <div className="mb-2 mt-4 text-lg font-medium">
                              Compliance Chatbot
                            </div>
                            <p className="text-sm leading-tight text-muted-foreground">
                              Get instant answers to your compliance questions.
                            </p>
                          </Link>
                        </NavigationMenuLink>
                      </li>
                      <ListItem href="/compliance/general" title="General Inquiries">
                        Ask general compliance questions
                      </ListItem>
                      <ListItem href="/compliance/specific" title="Specific Regulations">
                        Get information on specific regulations
                      </ListItem>
                      <ListItem href="/compliance/history" title="Chat History">
                        View your past conversations
                      </ListItem>
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuTrigger>
                    <BarChart2 className="mr-2 h-4 w-4" />
                    Track
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
                      {[
                        {
                          title: "Compliance Dashboard",
                          href: "/track",
                          description: "View your overall compliance status",
                        },
                        {
                          title: "Task Management",
                          href: "/track/tasks",
                          description: "Manage and track compliance tasks",
                        },
                        {
                          title: "Reports",
                          href: "/track/reports",
                          description: "Generate and view compliance reports",
                        },
                        {
                          title: "Audit Logs",
                          href: "/track/audit",
                          description: "Review audit logs and activities",
                        },
                      ].map((item) => (
                        <ListItem
                          key={item.title}
                          title={item.title}
                          href={item.href}
                        >
                          {item.description}
                        </ListItem>
                      ))}
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
            >
              {theme === 'light' ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
              <span className="sr-only">Toggle theme</span>
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="relative h-8 w-8 rounded-full">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="/placeholder-avatar.jpg" alt="User" />
                    <AvatarFallback>
                      <User className="h-4 w-4" />
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onSelect={() => navigate('/profile')}>
                  Profile
                </DropdownMenuItem>
                <DropdownMenuItem onSelect={() => navigate('/settings')}>
                  Settings
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onSelect={() => navigate('/login')}>
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </nav>
  )
}