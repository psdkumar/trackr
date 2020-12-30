import { Button, Input } from 'coderplex-ui'
import { SignIn } from 'phosphor-react'
import { IconBrandGithub } from 'tabler-icons'
import { signIn } from 'next-auth/client'
import { Logo } from '@/components'

export default function Login({ csrfToken, callbackUrl }) {
  return (
    <>
      <div>
        <div className="flex flex-col justify-center py-12 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center sm:mx-auto sm:w-full sm:max-w-md">
            <Logo className="hidden" size={48} />
            <h2 className="mt-6 text-3xl font-extrabold leading-9 text-center text-gray-900">
              Login to your account
            </h2>
          </div>

          <div className="m-3 sm:m-5 sm:mx-auto sm:w-full sm:max-w-md">
            <div className="px-4 py-8 bg-white shadow rounded-md sm:rounded-lg sm:px-10">
              <form action="/api/auth/signin/email" method="POST">
                <input
                  name="csrfToken"
                  type="hidden"
                  defaultValue={csrfToken}
                />
                <Input
                  label="Email address"
                  id="email"
                  type="email"
                  name="email"
                  required={true}
                  placeholder="you@example.com"
                />

                <div className="mt-6">
                  <Button
                    isFullWidth={true}
                    className="flex justify-center w-full"
                    variant="solid"
                    variantColor="brand"
                    leadingIcon={SignIn}
                    type="submit"
                  >
                    Sign In
                  </Button>
                </div>
              </form>

              <div className="mt-6">
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-300"></div>
                  </div>
                  <div className="relative flex justify-center text-sm leading-5">
                    <span className="px-2 text-gray-500 bg-white">
                      Or continue with
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-3 mt-6">
                  <Button
                    className="flex justify-center w-full"
                    leadingIcon={IconBrandGithub}
                    variant="solid"
                    onClick={() => signIn('github')}
                  >
                    GitHub
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
