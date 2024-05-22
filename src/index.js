import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import store from "./state/store";
import DashBoard from "./scenes/DashBoard";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ProductList from "./scenes/products/ProductList";
import CategoryList from "./scenes/categories/CategoryList";
import { PrimeReactProvider } from "primereact/api";
import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import { AuthProvider } from "./auth/AuthContext";
import ProtectedRoute from "./auth/ProtectedRoute";
import Login from "./scenes/Login/Login";
import BrandList from "./scenes/brands/BrandList";
import 'react-toastify/dist/ReactToastify.css';
import ProductAdd from "./scenes/products/ProductAdd";
import ProductEdit from "./scenes/products/ProductEdit";
import ProductShow from "./scenes/products/ProductShow";
import UserList from "./scenes/user/UserList";
import NotFound from "./scenes/notFound/NotFound";
import NotForbidden from "./scenes/NotForbidden/NotForbidden";
import ClaimProtectedRoute from "./auth/ClaimProtectedRoute";
import { ClaimType, ClaimValue } from "./helpers/AppClaim";
import UserAdd from "./scenes/user/UserAdd";
import UserEdit from "./scenes/user/UserEdit";
import UserMyEdit from "./scenes/user/UserMyEdit";
import UserShow from "./scenes/user/UserShow";
import SliderList from "./scenes/sliders/SliderList";
import OrderList from "./scenes/orders/OrderList";
import SendEmail from "./scenes/SendEmailConfirm/SendEmail";
import ConfirmEmail from "./scenes/ConfirmEmail/ConfirmEmail";
import TagList from "./scenes/tags/TagList";
import MyMap from "./components/MyMap";
import WebInfoEdit from "./scenes/webInfo/WebInfoEdit";
import CouponList from "./scenes/coupons/CouponList";
import CouponAdd from "./scenes/coupons/CouponAdd";
import CouponEdit from "./scenes/coupons/CouponEdit";
import CouponShow from "./scenes/coupons/CouponShow";
import OrderEdit from "./scenes/orders/OrderEdit";
import MenuList from "./scenes/menus/MenuList";
import TopicList from "./scenes/Topics/TopicList";
import PageList from "./scenes/pages/PageList";
import PostList from "./scenes/posts/PostList";
import PageAdd from "./scenes/pages/PageAdd";

const root = ReactDOM.createRoot(document.getElementById("root"));
const router = createBrowserRouter([
  {
    path: "/",
    element: <ProtectedRoute><App /></ProtectedRoute>,
    children: [
      {
        index: true,
        element: <DashBoard />,
      },
      {
        path: "product",
        element: (
          
            <ClaimProtectedRoute claimType={ClaimType.ProductClaim} claimValue={ClaimValue.Show}><ProductList /></ClaimProtectedRoute>
          
        ),
      },
      {
        path: "product/create",
        element: (
          
          <ClaimProtectedRoute claimType={ClaimType.ProductClaim} claimValue={ClaimValue.Add}><ProductAdd /></ClaimProtectedRoute>
          
        ),
      },
      {
        path: "product/edit",
        element: (
          
          <ClaimProtectedRoute claimType={ClaimType.ProductClaim} claimValue={ClaimValue.Edit}><ProductEdit /></ClaimProtectedRoute>
          
        ),
      },
      {
        path: "product/show",
        element: (
          
          <ClaimProtectedRoute claimType={ClaimType.ProductClaim} claimValue={ClaimValue.Show}><ProductShow /></ClaimProtectedRoute>
          
        ),
      },
      {
        path: "user",
        element: (
          
          <ClaimProtectedRoute claimType={ClaimType.UserClaim} claimValue={ClaimValue.Show}><UserList /></ClaimProtectedRoute>
          
        ),
      },
      {
        path: "user/create",
        element: (
          
          <ClaimProtectedRoute claimType={ClaimType.UserClaim} claimValue={ClaimValue.Add}><UserAdd /></ClaimProtectedRoute>
          
        ),
      },
      {
        path: "user/edit",
        element: (
          
          <ClaimProtectedRoute claimType={ClaimType.UserClaim} claimValue={ClaimValue.Edit}><UserEdit /></ClaimProtectedRoute>
          
        ),
      },
      {
        path: "user/show",
        element: (
          
          <ClaimProtectedRoute claimType={ClaimType.UserClaim} claimValue={ClaimValue.Show}><UserShow /></ClaimProtectedRoute>
          
        ),
      },
      {
        path: "user/myEdit",
        element: (
          
          <UserMyEdit />
          
        ),
      },
      {
        path: "order",
        element: (
          
            <ClaimProtectedRoute claimType={ClaimType.ProductClaim} claimValue={ClaimValue.Show}><OrderList /></ClaimProtectedRoute>
          
        ),
      },
      {
        path: "order/edit",
        element: (
          
            <ClaimProtectedRoute claimType={ClaimType.ProductClaim} claimValue={ClaimValue.Edit}><OrderEdit /></ClaimProtectedRoute>
          
        ),
      },
      {
        path: "coupon",
        element: (
          
           <CouponList />
          
        ),
      },
      {
        path: "coupon/create",
        element: (
          
           <CouponAdd />
          
        ),
      },
      {
        path: "coupon/edit",
        element: (
          
           <CouponEdit />
          
        ),
      },
      {
        path: "coupon/show",
        element: (
          
           <CouponShow />
          
        ),
      },
      {
        path: "category",
        element:   <ClaimProtectedRoute claimType={ClaimType.CategoryClaim} claimValue={ClaimValue.Show}><CategoryList /></ClaimProtectedRoute>,
      },
      {
        path: "topic",
        element:   <ClaimProtectedRoute claimType={ClaimType.CategoryClaim} claimValue={ClaimValue.Show}><TopicList /></ClaimProtectedRoute>,
      },
      {
        path: "page",
        element:   <ClaimProtectedRoute claimType={ClaimType.CategoryClaim} claimValue={ClaimValue.Show}><PageList /></ClaimProtectedRoute>,
      },
      {
        path: "page/create",
        element:   <ClaimProtectedRoute claimType={ClaimType.CategoryClaim} claimValue={ClaimValue.Show}><PageAdd /></ClaimProtectedRoute>,
      },
      {
        path: "post",
        element:   <ClaimProtectedRoute claimType={ClaimType.CategoryClaim} claimValue={ClaimValue.Show}><PostList /></ClaimProtectedRoute>,
      },
      {
        path: "slider",
        element:   <ClaimProtectedRoute claimType={ClaimType.SliderClaim} claimValue={ClaimValue.Show}><SliderList /></ClaimProtectedRoute>,
      },
      {
        path: "tag",
        element:   <ClaimProtectedRoute claimType={ClaimType.SliderClaim} claimValue={ClaimValue.Show}><TagList /></ClaimProtectedRoute>,
      },
      {
        path: "web-info",
        element:   <ClaimProtectedRoute claimType={ClaimType.SliderClaim} claimValue={ClaimValue.Show}><WebInfoEdit /></ClaimProtectedRoute>,
      },
      {
        path: "menu",
        element:   <ClaimProtectedRoute claimType={ClaimType.SliderClaim} claimValue={ClaimValue.Show}><MenuList /></ClaimProtectedRoute>,
      },
      {
        path: "brand",
        element:  <BrandList />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "*",
    element: <NotFound />, 
  },
  {
    path: "/403",
    element: <NotForbidden />, 
  },
  {
    path: "/send-email",
    element: <SendEmail />, 
  },
  {
    path: "/confirm-email/:userId/:confirmEmailToken",
    element: <ConfirmEmail />, 
  },
  {
    path: "/test",
    element: <MyMap />, 
  },
]);

root.render(
  <React.StrictMode>
   
      <Provider store={store}>
      <AuthProvider>
        <RouterProvider router={router}>
          <PrimeReactProvider></PrimeReactProvider>
        </RouterProvider>
        </AuthProvider>
      </Provider>
   
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
