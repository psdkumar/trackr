import { NavBar, Button, Menu, Avatar } from 'coderplex-ui'
import { signIn, signOut, useSession } from 'next-auth/client'
import { PlusCircle } from 'phosphor-react'
import Logo from './Logo'
import Link from 'next/link'
import { useState } from 'react'
import CreateActivityModal from './CreateActivityModal'
import { useRouter } from 'next/router'

export default function AppNavBar() {
  const [session, loading] = useSession()
  const router = useRouter()
  const [openActivityModal, setOpenActivityModal] = useState(false)

  return (
    <>
      {openActivityModal && (
        <CreateActivityModal
          isOpen={openActivityModal}
          setIsOpen={setOpenActivityModal}
        />
      )}

      <NavBar
        className="border-b shadow-xs"
        logo={<Logo className="hidden lg:block" />}
        leftDesktopItems={
          <>
            {/* <Link href="/" passHref={true}>
            <NavBar.Item.Desktop.Left isSelected={true}>
              Dashboard
            </NavBar.Item.Desktop.Left>
          </Link>
          <Link href="/" passHref={true}>
            <NavBar.Item.Desktop.Left>Team</NavBar.Item.Desktop.Left>
          </Link>
          <Link href="/" passHref={true}>
            <NavBar.Item.Desktop.Left>Projects</NavBar.Item.Desktop.Left>
          </Link>
          <Link href="/" passHref={true}>
            <NavBar.Item.Desktop.Left>Calendar</NavBar.Item.Desktop.Left>
          </Link> */}
          </>
        }
        rightDesktopItems={
          <>
            {loading && <p>loading....</p>}
            {!loading &&
              (session ? (
                <>
                  <Button
                    variant="solid"
                    variantColor="brand"
                    leadingIcon={PlusCircle}
                    onClick={() => setOpenActivityModal(true)}
                  >
                    New Activity
                  </Button>

                  <Menu
                    trigger={
                      <Avatar
                        size="sm"
                        className="cursor-pointer"
                        src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                      />
                    }
                    className="z-10 ml-3"
                  >
                    <Menu.Item>Your Profile</Menu.Item>
                    <Link href="/profile/settings" passHref={true}>
                      <Menu.Item>Settings</Menu.Item>
                    </Link>
                    <Menu.Item
                      onClick={async () => {
                        await signOut()
                        router.push('/')
                      }}
                    >
                      Sign Out
                    </Menu.Item>
                  </Menu>
                </>
              ) : (
                <>
                  <Button
                    variant="ghost"
                    variantColor="brand"
                    onClick={() => signIn()}
                  >
                    Sign In
                  </Button>
                  <Button
                    variant="solid"
                    variantColor="brand"
                    onClick={() => signIn()}
                  >
                    Sign Up
                  </Button>
                </>
              ))}
          </>
        }
        mobileItems={
          <>
            {/* <Link href="/" passHref={true}>
            <NavBar.Item.Mobile.Left isSelected={true}>
              Dashboard
            </NavBar.Item.Mobile.Left>
          </Link>
          <Link href="/" passHref={true}>
            <NavBar.Item.Mobile.Left>Team</NavBar.Item.Mobile.Left>
          </Link>
          <Link href="/" passHref={true}>
            <NavBar.Item.Mobile.Left>Projects</NavBar.Item.Mobile.Left>
          </Link>
          <Link href="/" passHref={true}>
            <NavBar.Item.Mobile.Left>Calendar</NavBar.Item.Mobile.Left>
          </Link> */}
          </>
        }
      />
    </>
  )
}
