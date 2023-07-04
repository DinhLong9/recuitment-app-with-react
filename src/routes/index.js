import LayoutDefault from "../components/layout";
import Company from "../pages/Company";
import Home from "../pages/Home";
import JobDetails from "../pages/JobDetails";
import Login from "../pages/Login";
import Register from "../pages/Register";
import SearchAnswers from "../pages/SearchAnswers";
import CompanyDetails from "../pages/CompanyDetails";
import Logout from "../pages/Logout";
import PrivateNavigate from "../components/PrivateNavigate";
import LayoutAdmin from "../components/layoutAdmin";
import Dashboard from "../pages/Dashboard";
import InforCompany from "../pages/InforCompany";
import JobsManage from "../pages/JobsManage";
import CreateJob from "../pages/CreateJob";
import DetailsJobAdmin from "../pages/DetailsJobAdmin";
import CvManage from "../pages/CvManage";
import DetailsCv from "../pages/DetailsCv";

export const routes = [
  {
    path: "/",
    element: <LayoutDefault />,
    children: [
      {
        // path: "/",
        index: true,
        element: <Home />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "logout",
        element: <Logout />,
      },
      {
        path: "register",
        element: <Register />,
      },
      {
        path: "search",
        element: <SearchAnswers />,
      },
      {
        path: "job/:id",
        element: <JobDetails />,
      },
      {
        path: "company",
        element: <Company />,
      },
      {
        path: "company/:id",
        element: <CompanyDetails />,
      },
    ],
  },
  {
    element: <PrivateNavigate />,
    children: [
      {
        element: <LayoutAdmin />,
        children: [
          {
            path: "admin",
            element: <Dashboard />,
          },
          {
            path: "infor-company",
            element: <InforCompany />,
          },
          {
            path: "job-manage",
            element: <JobsManage />,
          },
          {
            path: "create-job",
            element: <CreateJob />,
          },
          {
            path: "details-job/:id",
            element: <DetailsJobAdmin />,
          },
          {
            path: "cv-manage",
            element: <CvManage />,
          },
          {
            path: "details-cv/:id",
            element: <DetailsCv />,
          },
        ],
      },
    ],
  },
];
