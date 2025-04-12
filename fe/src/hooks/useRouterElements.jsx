import { useRoutes } from "react-router-dom";
import LayoutDashboard from "../layouts/LayoutDashboard";
import Document from "../pages/Document/Document";
import LayoutMain from "../layouts/LayoutMain";
import Student from "../pages/Student/Student";
import DocumentCreate from "../pages/Document/components/Create";
import StudentCreate from "../pages/Student/components/Create";
import Register from "../pages/Register/Register";
import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";
// import Contact from "../pages/Contact/Contact";
import Main from "../pages/Main/Main";
import Detail from "../pages/Detail/Detail";
import Introduce from "../pages/Introduce/Introduce";
import Info from "../pages/Info/Info";
import Progress from "../pages/Progress/Progress";
import StudentEdit from "../pages/Student/components/Edit";
import CategoryType from "../pages/CategoryType/CategoryType";
import CreateCategoryType from "../pages/CategoryType/components/Create";
import EditCategoryType from "../pages/CategoryType/components/Edit";
import TypeItem from "../pages/TypeItem/TypeItem";
import CreatePdf from "../pages/CreatePdf/CreatePdf";
// import TypeItemCreate from "../pages/TypeItem/components/Create";
// import TypeItemEdit from "../pages/TypeItem/components/Edit";
// import DocumentEdit from "../pages/Document/components/Edit";

const useRouterElements = () => {
    const routerElements = useRoutes([
        {
            path: '/admin',
            element: <LayoutDashboard />,
            children: [
                {
                    path: '/admin/',
                    element: <Document />
                },
                {
                    path: '/admin/document/create',
                    element: <DocumentCreate />
                },
                // {
                //     path: '/admin/document/edit',
                //     element: <DocumentEdit />
                // },
                {
                    path: '/admin/student',
                    element: <Student />
                },
                {
                    path: '/admin/student/create',
                    element: <StudentCreate />
                },
                {
                    path: '/admin/student/edit',
                    element: <StudentEdit />
                },
                {
                    path: '/admin/category-type',
                    element: <CategoryType />
                },
                {
                    path: '/admin/category-type/create',
                    element: <CreateCategoryType />
                },
                {
                    path: '/admin/category-type/edit',
                    element: <EditCategoryType />
                },
                {
                    path: '/admin/type-item',
                    element: <TypeItem />
                },
                // {
                //     path: '/admin/type-item/create',
                //     element: <TypeItemCreate />
                // },
                // {
                //     path: '/admin/type-item/edit',
                //     element: <TypeItemEdit />
                // },
            ]
        },
        {
            path: '/',
            element: <LayoutMain />,
            children: [
                {
                    path: '/',
                    element: <Home />
                },
                {
                    path: '/main',
                    element: <Main />
                },
                {
                    path: '/main/detail',
                    element: <Detail />
                },
                {
                    path: '/introduce',
                    element: <Introduce />
                },
                {
                    path: '/info',
                    element: <Info />
                },
                {
                    path: '/progress',
                    element: <Progress />
                },
                {
                    path: '/create-pdf',
                    element: <CreatePdf />
                },
                // {
                //     path: '/contact',
                //     element: <Contact />
                // }
            ]
        },
        {
            path:'/login',
            element: <Login />
        },
        {
            path: '/register',
            element: <Register />
        }
    ]);
    return routerElements;
};

export default useRouterElements;