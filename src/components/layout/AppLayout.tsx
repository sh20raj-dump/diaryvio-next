"use client";

import React, { useState, Fragment, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useSession, signOut } from 'next-auth/react';
import { Dialog, Transition, Menu, Disclosure } from '@headlessui/react';
import {
  HomeIcon,
  MagnifyingGlassIcon,
  MicrophoneIcon,
  PencilIcon,
  CalendarIcon,
  UserIcon,
  Bars3Icon,
  XMarkIcon,
  Cog6ToothIcon,
  ArrowRightOnRectangleIcon,
  ChevronUpIcon
} from '@heroicons/react/24/outline';

interface AppLayoutProps {
  children: React.ReactNode;
  title?: string;
  extra?: React.ReactNode;
}

export default function AppLayout({ children, title = 'DiaryVio', extra }: AppLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const pathname = usePathname();
  const { data: session, status } = useSession();

  const isAuthenticated = status === "authenticated";
  const userName = session?.user?.name?.split(" ")[0] || "User";

  // Check if mobile on client side
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);

    return () => {
      window.removeEventListener('resize', checkIfMobile);
    };
  }, []);

  const navigation = [
    { name: 'Home', href: '/diary', icon: HomeIcon, current: pathname === '/diary' },
    { name: 'Search', href: '/diary/search', icon: MagnifyingGlassIcon, current: pathname === '/diary/search' },
    { name: 'Voice Entry', href: '/diary/new', icon: MicrophoneIcon, current: pathname === '/diary/new' },
    { name: 'Text Entry', href: '/diary/new-text', icon: PencilIcon, current: pathname === '/diary/new-text' },
    { name: 'Timeline', href: '/diary/timeline', icon: CalendarIcon, current: pathname === '/diary/timeline' },
  ];

  return (
    <div className="h-screen flex bg-gray-950 text-white">
      {/* Mobile sidebar */}
      <Transition.Root show={sidebarOpen} as={Fragment}>
        <Dialog as="div" className="relative z-50 lg:hidden" onClose={setSidebarOpen}>
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-900/80" />
          </Transition.Child>

          <div className="fixed inset-0 flex">
            <Transition.Child
              as={Fragment}
              enter="transition ease-in-out duration-300 transform"
              enterFrom="-translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-x-0"
              leaveTo="-translate-x-full"
            >
              <Dialog.Panel className="relative mr-16 flex w-full max-w-xs flex-1">
                <Transition.Child
                  as={Fragment}
                  enter="ease-in-out duration-300"
                  enterFrom="opacity-0"
                  enterTo="opacity-100"
                  leave="ease-in-out duration-300"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <div className="absolute left-full top-0 flex w-16 justify-center pt-5">
                    <button type="button" className="-m-2.5 p-2.5" onClick={() => setSidebarOpen(false)}>
                      <span className="sr-only">Close sidebar</span>
                      <XMarkIcon className="h-6 w-6 text-white" aria-hidden="true" />
                    </button>
                  </div>
                </Transition.Child>

                {/* Sidebar component for mobile */}
                <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-gray-900 px-6 pb-4 ring-1 ring-white/10">
                  <div className="flex h-16 shrink-0 items-center">
                    <Link href="/diary" className="text-2xl font-bold text-indigo-400">
                      DiaryVio
                    </Link>
                  </div>
                  <nav className="flex flex-1 flex-col">
                    <ul role="list" className="flex flex-1 flex-col gap-y-7">
                      <li>
                        <ul role="list" className="-mx-2 space-y-1">
                          {navigation.map((item) => (
                            <li key={item.name}>
                              <Link
                                href={item.href}
                                className={`
                                  group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6
                                  ${item.current ? 'bg-gray-800 text-white' : 'text-gray-400 hover:text-white hover:bg-gray-800'}
                                `}
                                onClick={() => setSidebarOpen(false)}
                              >
                                <item.icon className="h-6 w-6 shrink-0" aria-hidden="true" />
                                {item.name}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </li>

                      <li className="mt-auto">
                        <Disclosure>
                          {({ open }) => (
                            <>
                              <Disclosure.Button className="flex w-full items-center gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 text-gray-400 hover:text-white hover:bg-gray-800">
                                <UserIcon className="h-6 w-6 shrink-0" aria-hidden="true" />
                                <span className="flex-1 text-left">{userName}</span>
                                <ChevronUpIcon
                                  className={`${open ? '' : 'rotate-180 transform'} h-5 w-5`}
                                />
                              </Disclosure.Button>
                              <Disclosure.Panel className="px-4 pt-2 pb-2 text-sm">
                                <ul className="space-y-1">
                                  <li>
                                    <Link
                                      href="/profile"
                                      className="flex items-center gap-x-3 rounded-md p-2 text-gray-400 hover:text-white hover:bg-gray-800"
                                    >
                                      <UserIcon className="h-5 w-5" />
                                      Profile
                                    </Link>
                                  </li>
                                  <li>
                                    <Link
                                      href="/settings"
                                      className="flex items-center gap-x-3 rounded-md p-2 text-gray-400 hover:text-white hover:bg-gray-800"
                                    >
                                      <Cog6ToothIcon className="h-5 w-5" />
                                      Settings
                                    </Link>
                                  </li>
                                  <li>
                                    <button
                                      onClick={() => signOut({ callbackUrl: '/' })}
                                      className="flex w-full items-center gap-x-3 rounded-md p-2 text-gray-400 hover:text-white hover:bg-gray-800"
                                    >
                                      <ArrowRightOnRectangleIcon className="h-5 w-5" />
                                      Sign Out
                                    </button>
                                  </li>
                                </ul>
                              </Disclosure.Panel>
                            </>
                          )}
                        </Disclosure>
                      </li>
                    </ul>
                  </nav>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>

      {/* Static sidebar for desktop */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
        <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-gray-900 px-6 pb-4">
          <div className="flex h-16 shrink-0 items-center">
            <Link href="/diary" className="text-2xl font-bold text-indigo-400">
              DiaryVio
            </Link>
          </div>
          <nav className="flex flex-1 flex-col">
            <ul role="list" className="flex flex-1 flex-col gap-y-7">
              <li>
                <ul role="list" className="-mx-2 space-y-1">
                  {navigation.map((item) => (
                    <li key={item.name}>
                      <Link
                        href={item.href}
                        className={`
                          group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6
                          ${item.current ? 'bg-gray-800 text-white' : 'text-gray-400 hover:text-white hover:bg-gray-800'}
                        `}
                      >
                        <item.icon className="h-6 w-6 shrink-0" aria-hidden="true" />
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>

              <li className="mt-auto">
                <Menu as="div" className="relative">
                  <Menu.Button className="flex w-full items-center gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 text-gray-400 hover:text-white hover:bg-gray-800">
                    <UserIcon className="h-6 w-6 shrink-0" aria-hidden="true" />
                    <span className="flex-1 text-left">{userName}</span>
                  </Menu.Button>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="absolute bottom-full mb-2 left-0 z-10 w-full origin-bottom-left rounded-md bg-gray-800 py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <Menu.Item>
                        {({ active }) => (
                          <Link
                            href="/profile"
                            className={`${
                              active ? 'bg-gray-700' : ''
                            } flex items-center px-4 py-2 text-sm text-gray-300`}
                          >
                            <UserIcon className="mr-3 h-5 w-5" aria-hidden="true" />
                            Profile
                          </Link>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <Link
                            href="/settings"
                            className={`${
                              active ? 'bg-gray-700' : ''
                            } flex items-center px-4 py-2 text-sm text-gray-300`}
                          >
                            <Cog6ToothIcon className="mr-3 h-5 w-5" aria-hidden="true" />
                            Settings
                          </Link>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <button
                            onClick={() => signOut({ callbackUrl: '/' })}
                            className={`${
                              active ? 'bg-gray-700' : ''
                            } flex w-full items-center px-4 py-2 text-sm text-gray-300`}
                          >
                            <ArrowRightOnRectangleIcon className="mr-3 h-5 w-5" aria-hidden="true" />
                            Sign Out
                          </button>
                        )}
                      </Menu.Item>
                    </Menu.Items>
                  </Transition>
                </Menu>
              </li>
            </ul>
          </nav>
        </div>
      </div>

      {/* Main content area */}
      <div className="flex flex-1 flex-col lg:pl-72">
        {/* Top header */}
        <div className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b border-gray-800 bg-gray-900 px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8">
          <button
            type="button"
            className="-m-2.5 p-2.5 text-gray-400 lg:hidden"
            onClick={() => setSidebarOpen(true)}
          >
            <span className="sr-only">Open sidebar</span>
            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
          </button>

          {/* Separator */}
          <div className="h-6 w-px bg-gray-800 lg:hidden" aria-hidden="true" />

          <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
            <div className="flex-1 flex items-center">
              <h1 className="text-xl font-semibold text-white">{title}</h1>
            </div>

            {/* Extra content (buttons, etc.) */}
            {extra && (
              <div className="flex items-center gap-x-4 lg:gap-x-6">
                {extra}
              </div>
            )}

            {/* User menu (mobile only) */}
            <div className="flex items-center gap-x-4 lg:hidden">
              <Menu as="div" className="relative">
                <Menu.Button className="-m-1.5 flex items-center p-1.5">
                  <span className="sr-only">Open user menu</span>
                  <div className="h-8 w-8 rounded-full bg-indigo-600 flex items-center justify-center">
                    {session?.user?.image ? (
                      <img
                        className="h-8 w-8 rounded-full"
                        src={session.user.image}
                        alt=""
                      />
                    ) : (
                      <UserIcon className="h-5 w-5 text-white" aria-hidden="true" />
                    )}
                  </div>
                </Menu.Button>
                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <Menu.Items className="absolute right-0 z-10 mt-2.5 w-32 origin-top-right rounded-md bg-gray-800 py-2 shadow-lg ring-1 ring-gray-900/5 focus:outline-none">
                    <Menu.Item>
                      {({ active }) => (
                        <Link
                          href="/profile"
                          className={`${
                            active ? 'bg-gray-700' : ''
                          } block px-3 py-1 text-sm leading-6 text-gray-300`}
                        >
                          Profile
                        </Link>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <Link
                          href="/settings"
                          className={`${
                            active ? 'bg-gray-700' : ''
                          } block px-3 py-1 text-sm leading-6 text-gray-300`}
                        >
                          Settings
                        </Link>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <button
                          onClick={() => signOut({ callbackUrl: '/' })}
                          className={`${
                            active ? 'bg-gray-700' : ''
                          } block w-full text-left px-3 py-1 text-sm leading-6 text-gray-300`}
                        >
                          Sign Out
                        </button>
                      )}
                    </Menu.Item>
                  </Menu.Items>
                </Transition>
              </Menu>
            </div>
          </div>
        </div>

        {/* Main content */}
        <main className="flex-1 bg-gray-900">
          <div className="py-6 px-4 sm:px-6 lg:px-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
