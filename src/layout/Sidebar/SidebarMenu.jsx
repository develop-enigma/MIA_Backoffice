import * as Icons from 'tabler-icons-react';
import HkBadge from '@/components/@hk-badge/@hk-badge';

export const SidebarMenu = [
    {
        group: '',
        contents: [
            {
                name: 'Dashboard',
                icon: <Icons.Template />,
                path: '/dashboard',
                //badge: <HkBadge size="sm" bg="pink" soft className="ms-auto" >dati</HkBadge>
            },
        ]
    },
    {
        group: 'Strumenti',
        contents: [
            {
                id: 'dash_chat',
                name: 'Chat',
                icon: <Icons.MessageDots />,
                path: '/apps/chat/chats',
            },
            {
                id: "dash_contact",
                name: 'Contact',
                icon: <Icons.Hanger />,
                path: '/apps/contact/contact-list',
            },
            /* {
                id: "dash_task",
                name: 'Todo',
                icon: <Icons.ListDetails />,
                path: '/apps/todo/',
                badge: <HkBadge bg="success" soft className="ms-2">2</HkBadge>,
                childrens: [
                    {
                        name: 'Tasklist',
                        path: '/apps/todo/task-list',
                        grp_name: "apps",
                    },
                    {
                        name: 'Gantt',
                        path: '/apps/todo/gantt',
                        grp_name: "apps",
                    },
                ]
            }, */
        ]
    },
    {
        group: 'Impostazioni',
        contents: [
            {
                id: 'dash_chat',
                name: 'Setting',
                icon: <Icons.Settings />,
                path: '/apps/todo/task-list',
            },
            /* {
                id: "dash_task",
                name: 'Todo',
                icon: <Icons.ListDetails />,
                path: '/apps/todo/',
                badge: <HkBadge bg="success" soft className="ms-2">2</HkBadge>,
                childrens: [
                    {
                        name: 'Tasklist',
                        path: '/apps/todo/task-list',
                        grp_name: "apps",
                    },
                    {
                        name: 'Gantt',
                        path: '/apps/todo/gantt',
                        grp_name: "apps",
                    },
                ]
            }, */
        ]
    },

    /* //Pages group
    {
        group: 'Pages',
        contents: [
            {
                id: "dash_pages",
                name: 'Authentication',
                icon: <Icons.UserPlus />,
                path: '/auth/',
                childrens: [
                    {
                        id: "dash_log",
                        name: 'Log In',
                        path: '/auth/login/',
                        childrens: [
                            {
                                name: 'Login',
                                path: '/auth/login',
                            },
                            {
                                name: 'Login Simple',
                                path: '/auth/login/simple',
                            },
                            {
                                name: 'Login Classic',
                                path: '/auth/login/classic',
                            },
                        ]
                    },
                    {
                        id: "dash_sign",
                        name: 'Sign Up',
                        path: '/auth/signup/',
                        childrens: [
                            {
                                name: 'Signup',
                                path: '/auth/signup',
                            },
                            {
                                name: 'Signup Simple',
                                path: '/auth/signup/simple',
                            },
                            {
                                name: 'Signup Classic',
                                path: '/auth/signup/classic',
                            },
                        ]
                    },
                    {
                        name: 'Lock Screen',
                        path: '/auth/lock-screen',
                    },
                    {
                        name: 'Reset Password',
                        path: '/auth/reset-password',
                    },
                    {
                        name: 'Error 404',
                        path: '/error-404',
                    },
                    {
                        name: 'Error 503',
                        path: '/error-503',
                    },
                ]
            },

        ]
    }, */

]