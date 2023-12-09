import {
    Airplay,
    BarChart,
    CreditCard,
    Edit,
    Grid,
    Layout,
    Lock,
    MapPin,
    UserPlus,
    Users,
} from 'react-feather'
import { BiBuildingHouse } from 'react-icons/bi'
import { BsBuildingFillAdd } from 'react-icons/bs'
import { FaRegNewspaper, FaUsers } from 'react-icons/fa'
import { MdOutlineApartment } from 'react-icons/md'
import { urls } from './custom-data/urls'

export const AdminSidebarMenuItem = [
    {
        title: 'Agents List',
        icon: <FaUsers />,
        path: urls.admin.pages.agents.all,
        type: 'link',
    },
    {
        title: 'Add Agent',
        icon: <UserPlus />,
        path: urls.admin.pages.agents.add,
        type: 'link',
    },
    {
        title: 'Properties List',
        icon: <MdOutlineApartment stroke="none" />,
        type: 'link',
        path: urls.admin.pages.properties.all,
    },
    {
        title: 'Projects List',
        icon: <BiBuildingHouse stroke="none" />,
        type: 'link',
        path: urls.admin.pages.projects.all,
    },
    {
        title: 'Blog',
        icon: <FaRegNewspaper stroke="none" />,
        type: 'sub',
        children: [
            {
                path: urls.admin.pages.articles.all,
                title: 'Article List',
                type: 'link',
            },
            {
                path: urls.admin.pages.articles.add,
                title: 'Add Article',
                type: 'link',
            },
        ],
    },
    {
        title: 'Developer',
        icon: <FaRegNewspaper stroke="none" />,
        type: 'sub',
        children: [
            {
                path: urls.admin.pages.developer.all,
                title: 'Developers List',
                type: 'link',
            },
            {
                path: urls.admin.pages.developer.add,
                title: 'Add Developer',
                type: 'link',
            },
        ],
    },
    {
        title: 'Area',
        icon: <FaRegNewspaper stroke="none" />,
        type: 'sub',
        children: [
            {
                path: urls.admin.pages.area.all,
                title: 'Areas List',
                type: 'link',
            },
            {
                path: urls.admin.pages.area.add,
                title: 'Add Area',
                type: 'link',
            },
        ],
    },
    {
        title: 'Leads',
        icon: <Edit />,
        type: 'link',
        path: urls.common.pages.leads.all,
    },
]

export const AgentSidebarMenuItem = [
    {
        title: 'Properties List',
        icon: <MdOutlineApartment stroke="none" />,
        type: 'link',
        path: urls.agent.pages.properties.all,
    },
    {
        title: 'Add Property',
        icon: <BsBuildingFillAdd stroke="none" />,
        type: 'link',
        path: urls.agent.pages.properties.add,
    },
    {
        title: 'Projects List',
        icon: <BiBuildingHouse stroke="none" />,
        type: 'link',
        path: urls.agent.pages.projects.all,
    },
    {
        title: 'Add Project',
        icon: <BsBuildingFillAdd stroke="none" />,
        type: 'link',
        path: urls.agent.pages.projects.add,
    },
    {
        title: 'Edit Profile',
        icon: <Edit />,
        type: 'link',
        path: urls.agent.pages.agents.edit,
    },
    {
        title: 'Drafts',
        icon: <Edit />,
        type: 'sub',
        children: [
            {
                path: urls.agent.pages.drafts.properties.all,
                title: 'Property Drafts',
                type: 'link',
            },
            {
                path: urls.agent.pages.drafts.projects.all,
                title: 'Project Drafts',
                type: 'link',
            },
        ],
    },
    {
        title: 'Leads',
        icon: <Edit />,
        type: 'link',
        path: urls.common.pages.leads.all,
    },
]

export const SidebarMenuItem = [
    {
        title: 'Dashboard',
        icon: <Airplay />,
        type: 'link',
        path: '/dashboard',
    },
    {
        title: 'My Properies',
        icon: <Grid />,
        type: 'sub',
        children: [
            {
                path: '/myproperties/add-property',
                title: 'Add Propery',
                type: 'link',
            },
            {
                path: '/myproperties/edit-property',
                title: 'Edit Propery',
                type: 'link',
            },
            {
                path: '/myproperties/propertylist',
                title: 'Property List',
                type: 'link',
            },
            {
                path: '/myproperties/favourites',
                title: 'Favourites',
                type: 'link',
            },
        ],
    },
    {
        title: 'Manage users',
        icon: <Users />,
        type: 'sub',
        children: [
            {
                path: '/manage-users/profile',
                title: 'Profile',
                type: 'link',
            },
            {
                path: '/manage-users/add-user',
                title: 'Add User',
                type: 'link',
            },
            {
                path: '/manage-users/adduser-wizard',
                title: 'Add User Wizard',
                badge: true,
                type: 'link',
            },
            {
                path: '/manage-users/edit-user',
                title: 'Edit User',
                type: 'link',
            },
            {
                path: '/manage-users/allusers',
                title: 'All Users',
                type: 'link',
            },
        ],
    },
    {
        title: 'Agents',
        icon: <UserPlus />,
        type: 'sub',
        children: [
            {
                path: '/agents/profile',
                title: 'Profile',
                type: 'link',
            },
            {
                path: '/agents/add-agent',
                title: 'Add Agent',
                type: 'link',
            },
            {
                path: '/agents/add-agent-wizard',
                title: 'Add Agent Wizard',
                badge: true,
                type: 'link',
            },
            {
                path: '/agents/edit-agent',
                title: 'Edit Agent',
                type: 'link',
            },
            {
                path: '/agents/all-agents',
                title: 'All Agents',
                type: 'link',
            },
            {
                path: '/agents/invoice',
                title: 'Invoice',
                type: 'link',
            },
        ],
    },
    {
        title: 'Map',
        icon: <MapPin />,
        type: 'link',
        path: '/map',
    },
    {
        title: 'Types',
        icon: <Layout />,
        type: 'sub',
        children: [
            {
                path: '/types/family-house',
                title: 'Family House',
                type: 'link',
            },
            {
                path: '/types/cottage',
                title: 'Cottage',
                type: 'link',
            },
            {
                path: '/types/appartment',
                title: 'Appartment',
                type: 'link',
            },
            {
                path: '/types/condominium',
                title: 'Condominium',
                type: 'link',
            },
        ],
    },
    {
        title: 'Reports',
        icon: <BarChart />,
        type: 'link',
        path: '/reports',
    },
    {
        title: 'Payments',
        icon: <CreditCard />,
        type: 'link',
        path: '/payments',
    },
    {
        title: 'Authentication',
        icon: <Lock />,
        type: 'sub',
        children: [
            {
                path: '/authentication/login',
                title: 'LogIn',
                type: 'link',
            },
            {
                path: '/authentication/signup',
                title: 'Sign Up',
                type: 'link',
            },
            {
                path: '/authentication/404',
                title: '404',
                type: 'link',
            },
        ],
    },
]
