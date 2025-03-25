import { NavCompType } from "@/types";

const navs: NavCompType[] = [
    {
        label: 'About',
        href: '/',
        icon: 'ShieldQuestion',
    },
    {
        label: 'Events',
        href: '/events',
        icon: 'CalendarCheck',
    },
    {
        label: 'Dashboard',
        href: '/(marketing)/dashboard',
        icon: 'LayoutDashboard'
    },
    {
        label: 'Profile',
        href: '/(marketing)/users/profile',
        icon: 'User',
    },
    {
        label: 'Sign Up',
        href: '/(auth)/sign-up/',
        icon: 'UserPlus',
        highlight: true,
    },
]

export default navs;