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
import "react-toastify/dist/ReactToastify.css";
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
import PageEdit from "./scenes/pages/PageEdit";
import { PageActionTypes } from "./state/actions/pageActions";
import PageShow from "./scenes/pages/PageShow";
import PostAdd from "./scenes/posts/PostAdd";
import PostEdit from "./scenes/posts/PostEdit";
import PostShow from "./scenes/posts/PostShow";
import MenuEdit from "./scenes/menus/MenuEdit";
import MenuShow from "./scenes/menus/MenuShow";
import ContactList from "./scenes/contacts/ContactList";
import ContactEdit from "./scenes/contacts/ContactEdit";
import CustomerList from "./scenes/customer/CustomerList";

const root = ReactDOM.createRoot(document.getElementById("root"));
const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <App />
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: <DashBoard />,
      },
      {
        path: "product",
        element: (
          <ClaimProtectedRoute
            claimType={ClaimType.ProductClaim}
            claimValue={ClaimValue.Show}
          >
            <ProductList />
          </ClaimProtectedRoute>
        ),
      },
      {
        path: "product/create",
        element: (
          <ClaimProtectedRoute
            claimType={ClaimType.ProductClaim}
            claimValue={ClaimValue.Add}
          >
            <ProductAdd />
          </ClaimProtectedRoute>
        ),
      },
      {
        path: "product/edit",
        element: (
          <ClaimProtectedRoute
            claimType={ClaimType.ProductClaim}
            claimValue={ClaimValue.Edit}
          >
            <ProductEdit />
          </ClaimProtectedRoute>
        ),
      },
      {
        path: "product/show",
        element: (
          <ClaimProtectedRoute
            claimType={ClaimType.ProductClaim}
            claimValue={ClaimValue.Show}
          >
            <ProductShow />
          </ClaimProtectedRoute>
        ),
      },
      {
        path: "user",
        element: (
          <ClaimProtectedRoute
            claimType={ClaimType.UserClaim}
            claimValue={ClaimValue.Show}
          >
            <UserList />
          </ClaimProtectedRoute>
        ),
      },
      {
        path: "user/create",
        element: (
          <ClaimProtectedRoute
            claimType={ClaimType.UserClaim}
            claimValue={ClaimValue.Add}
          >
            <UserAdd />
          </ClaimProtectedRoute>
        ),
      },
      {
        path: "user/edit",
        element: (
          <ClaimProtectedRoute
            claimType={ClaimType.UserClaim}
            claimValue={ClaimValue.Edit}
          >
            <UserEdit />
          </ClaimProtectedRoute>
        ),
      },
      {
        path: "user/show",
        element: (
          <ClaimProtectedRoute
            claimType={ClaimType.UserClaim}
            claimValue={ClaimValue.Show}
          >
            <UserShow />
          </ClaimProtectedRoute>
        ),
      },
      {
        path: "user/myEdit",
        element: <UserMyEdit />,
      },
      {
        path: "customer",
        element: (
          <ClaimProtectedRoute
            claimType={ClaimType.UserClaim}
            claimValue={ClaimValue.Show}
          >
            <CustomerList />
          </ClaimProtectedRoute>
        ),
      },
      {
        path: "order",
        element: (
          <ClaimProtectedRoute
            claimType={ClaimType.OrderClaim}
            claimValue={ClaimValue.Show}
          >
            <OrderList />
          </ClaimProtectedRoute>
        ),
      },
      {
        path: "order/edit",
        element: (
          <ClaimProtectedRoute
            claimType={ClaimType.OrderClaim}
            claimValue={ClaimValue.Edit}
          >
            <OrderEdit />
          </ClaimProtectedRoute>
        ),
      },
      {
        path: "coupon",
        element: (
          <ClaimProtectedRoute
            claimType={ClaimType.CouponClaim}
            claimValue={ClaimValue.Show}
          >
            <CouponList />
          </ClaimProtectedRoute>
        ),
      },
      {
        path: "coupon/create",
        element: 
        <ClaimProtectedRoute
        claimType={ClaimType.CouponClaim}
        claimValue={ClaimValue.Add}
      >
         <CouponAdd />
      </ClaimProtectedRoute>
       ,
      },
      {
        path: "coupon/edit",
        element:  <ClaimProtectedRoute
        claimType={ClaimType.CouponClaim}
        claimValue={ClaimValue.Edit}
      >
        <CouponEdit />
      </ClaimProtectedRoute>,
      },
      {
        path: "coupon/show",
        element:  <ClaimProtectedRoute
        claimType={ClaimType.CouponClaim}
        claimValue={ClaimValue.Show}
      >
        <CouponShow />
      </ClaimProtectedRoute>,
      },
      {
        path: "category",
        element: (
          <ClaimProtectedRoute
            claimType={ClaimType.CategoryClaim}
            claimValue={ClaimValue.Show}
          >
            <CategoryList />
          </ClaimProtectedRoute>
        ),
      },
      {
        path: "topic",
        element: (
          <ClaimProtectedRoute
            claimType={ClaimType.TopicClaim}
            claimValue={ClaimValue.Show}
          >
            <TopicList />
          </ClaimProtectedRoute>
        ),
      },
      {
        path: "contact",
        element: (
          <ClaimProtectedRoute
            claimType={ClaimType.ContactClaim}
            claimValue={ClaimValue.Show}
          >
            <ContactList />
          </ClaimProtectedRoute>
        ),
      },
      {
        path: "contact/edit",
        element: (
          <ClaimProtectedRoute
            claimType={ClaimType.ContactClaim}
            claimValue={ClaimValue.Edit}
          >
            <ContactEdit />
          </ClaimProtectedRoute>
        ),
      },
      {
        path: "page",
        element: (
          <ClaimProtectedRoute
            claimType={ClaimType.PostClaim}
            claimValue={ClaimValue.Show}
          >
            <PageList />
          </ClaimProtectedRoute>
        ),
      },
      {
        path: "page/create",
        element: (
          <ClaimProtectedRoute
            claimType={ClaimType.PostClaim}
            claimValue={ClaimValue.Add}
          >
            <PageAdd />
          </ClaimProtectedRoute>
        ),
      },
      {
        path: "page/edit",
        element: (
          <ClaimProtectedRoute
            claimType={ClaimType.PostClaim}
            claimValue={ClaimValue.Edit}
          >
            <PageEdit />
          </ClaimProtectedRoute>
        ),
      },
      {
        path: "page/show",
        element: (
          <ClaimProtectedRoute
            claimType={ClaimType.PostClaim}
            claimValue={ClaimValue.Show}
          >
            <PageShow />
          </ClaimProtectedRoute>
        ),
      },
      {
        path: "post",
        element: (
          <ClaimProtectedRoute
            claimType={ClaimType.PostClaim}
            claimValue={ClaimValue.Show}
          >
            <PostList />
          </ClaimProtectedRoute>
        ),
      },
      {
        path: "post/create",
        element: (
          <ClaimProtectedRoute
            claimType={ClaimType.PostClaim}
            claimValue={ClaimValue.Add}
          >
            <PostAdd />
          </ClaimProtectedRoute>
        ),
      },
      {
        path: "post/edit",
        element: (
          <ClaimProtectedRoute
            claimType={ClaimType.PostClaim}
            claimValue={ClaimValue.Edit}
          >
            <PostEdit />
          </ClaimProtectedRoute>
        ),
      },
      {
        path: "post/show",
        element: (
          <ClaimProtectedRoute
            claimType={ClaimType.PostClaim}
            claimValue={ClaimValue.Show}
          >
            <PostShow />
          </ClaimProtectedRoute>
        ),
      },
      {
        path: "slider",
        element: (
          <ClaimProtectedRoute
            claimType={ClaimType.SliderClaim}
            claimValue={ClaimValue.Show}
          >
            <SliderList />
          </ClaimProtectedRoute>
        ),
      },
      {
        path: "tag",
        element: (
          <ClaimProtectedRoute
            claimType={ClaimType.TagClaim}
            claimValue={ClaimValue.Show}
          >
            <TagList />
          </ClaimProtectedRoute>
        ),
      },
      {
        path: "web-info",
        element: (
          <ClaimProtectedRoute
            claimType={ClaimType.TagClaim}
            claimValue={ClaimValue.Show}
          >
            <WebInfoEdit />
          </ClaimProtectedRoute>
        ),
      },
      {
        path: "menu",
        element: (
          <ClaimProtectedRoute
            claimType={ClaimType.MenuClaim}
            claimValue={ClaimValue.Show}
          >
            <MenuList />
          </ClaimProtectedRoute>
        ),
      },
      {
        path: "menu/edit",
        element: (
          <ClaimProtectedRoute
            claimType={ClaimType.MenuClaim}
            claimValue={ClaimValue.Edit}
          >
            <MenuEdit />
          </ClaimProtectedRoute>
        ),
      },
      {
        path: "menu/show",
        element: (
          <ClaimProtectedRoute
            claimType={ClaimType.MenuClaim}
            claimValue={ClaimValue.Show}
          >
            <MenuShow />
          </ClaimProtectedRoute>
        ),
      },
      {
        path: "brand",
        element:  <ClaimProtectedRoute
        claimType={ClaimType.BrandClaim}
        claimValue={ClaimValue.Show}
      > <BrandList /></ClaimProtectedRoute>,
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
  // <React.StrictMode>
    <Provider store={store}>
      <AuthProvider>
        <RouterProvider router={router}>
          <PrimeReactProvider></PrimeReactProvider>
        </RouterProvider>
      </AuthProvider>
    </Provider>
  // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
