import { useRoutes } from "react-router-dom";
import LayoutDashboard from "../layouts/LayoutDashboard";
import Document from "../pages/Document/Document";
import LayoutMain from "../layouts/LayoutMain";
import Student from "../pages/Student/Student";
import DocumentCreate from "../pages/Document/components/Create";
import StudentCreate from "../pages/Student/components/Create";

const useRouterElements = () => {
    const routerElements = useRoutes([
        {
            path: '/',
            element: <LayoutMain />
        },
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
                {
                    path: '/admin/student',
                    element: <Student />
                },
                {
                    path: '/admin/student/create',
                    element: <StudentCreate />
                }
            ]
        }
    ]);
    return routerElements;
};

export default useRouterElements;