import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import MenuItems from "./MenuItems";
import { ClaimType, ClaimValue } from "../helpers/AppClaim";
import appUrl from "../api/appUrl";

function Sidebar() {
  const { user } = useSelector(state => state.authReducer);
  const menuData=[
    {
      
      title:"Sản phẩm",
      icon:"pi pi-objects-column",
      items:[
        {
        title:"Tất cả sản phẩm",
        path: "product",
        claimType:ClaimType.ProductClaim,
        claimValue:ClaimValue.Show
      },
      {
        title:"Danh mục",
        path:"category",
        claimType:ClaimType.CategoryClaim,
        claimValue:ClaimValue.Show

      },
      {
        title:"Thương hiệu",
        path:"brand",
        claimType:ClaimType.BrandClaim,
        claimValue:ClaimValue.Show

      },

    ]
    },
    {
      title:"Quản lý người dùng",
      icon:"pi pi-users",
      items:[
        {
        title:"Nhân viên hệ thống",
        path: "user",
        claimType:ClaimType.UserClaim,
        claimValue:ClaimValue.Show
      },
      {
        title:"Khách hàng",
        path: "customer",
        claimType:ClaimType.UserClaim,
        claimValue:ClaimValue.Show
      },
      {
        title:"Liên hệ",
        path: "contact",
        claimType:ClaimType.ContactClaim,
        claimValue:ClaimValue.Show
      }
    ]
    },
    {
      title:"Quản lý giao diện",
      icon:"pi pi-palette",
      items:[
        {
        title:"Hình ảnh bìa",
        path: "slider",
        claimType:ClaimType.SliderClaim,
        claimValue:ClaimValue.Show
      },      {
        title:"Vị trí sản phẩm",
        path:"tag",
        claimType:ClaimType.TagClaim,
        claimValue:ClaimValue.Show

      }
      ,      {
        title:"Thông tin website",
        path:"web-info",
        claimType:ClaimType.WebInfoClaim,
        claimValue:ClaimValue.Show
      }
      ,      {
        title:"Quản lý Menu",
        path:"menu",
        claimType:ClaimType.MenuClaim,
        claimValue:ClaimValue.Show
      }
    ]
    },
    {
      title:"Quản lý đơn hàng",
      icon:"pi pi-money-bill",
      items:[
        {
        title:"Danh sách đơn hàng",
        path: "order",
        claimType:ClaimType.OrderClaim,
        claimValue:ClaimValue.Show
      },
      {
        title:"Danh sách mã giảm giá",
        path: "coupon",
        claimType:ClaimType.CouponClaim,
        claimValue:ClaimValue.Show
      },
      
    ]
    },
    {
      title:"Quản lý bài viết",
      icon:"pi pi-file-edit",
      items:[
        {
        title:"Chủ đề ",
        path: "topic",
        claimType:ClaimType.TopicClaim,
        claimValue:ClaimValue.Show
      },      {
        title:"Bài viết",
        path:"post",
        claimType:ClaimType.PostClaim,
        claimValue:ClaimValue.Show

      }
      ,      {
        title:"Trang đơn",
        path:"page",
        claimType:ClaimType.PostClaim,
        claimValue:ClaimValue.Show
      }
    ]
    },
  ]
  return (
    <aside className="main-sidebar sidebar-dark-primary elevation-4" style={{ height:'130vh' }}>
      <Link to="/" className="brand-link">
        <span className="brand-text font-weight-light">Admin TK Shop</span>
      </Link>

      <div className="sidebar os-host os-theme-light os-host-resize-disabled os-host-scrollbar-horizontal-hidden os-host-transition os-host-scrollbar-vertical-hidden">
        <div className="os-resize-observer-host observed">
          <div
            className="os-resize-observer"
            style={{ left: 0, right: "auto" }}
          />
        </div>
        <div
          className="os-size-auto-observer observed"
          style={{ height: "calc(100% + 1px)", float: "left" }}
        >
          <div className="os-resize-observer" />
        </div>
        <div
          className="os-content-glue"
          style={{ margin: "0px -8px", width: 249, height: 311 }}
        />
        <div className="os-padding">
          <div
            className="os-viewport os-viewport-native-scrollbars-invisible"
            style={{height:"300%"}}
          >
            <div
              className="os-content"
              style={{ padding: "0px 8px", height: "300%", width: "100%" }}
            >
              <div className="user-panel mt-3 pb-3 mb-3 d-flex">
                <div className="image">
                  <img
                    src={appUrl.avatarURL+user.avatar}
                    className="img-circle elevation-2"
                    alt="User Image"
                  />
                </div>
                <div className="info">
                  <Link to={"/user/myEdit"} className="d-block">
                    {user.userName}
                  </Link>
                </div>
              </div>
              {/* SidebarSearch Form */}
              <div className="form-inline">
                <div className="sidebar-search-results">
                  <div className="list-group">
                    <a href="#" className="list-group-item">
                      <div className="search-title">
                        <strong className="text-light" />N
                        <strong className="text-light" />o
                        <strong className="text-light" />{" "}
                        <strong className="text-light" />e
                        <strong className="text-light" />l
                        <strong className="text-light" />e
                        <strong className="text-light" />m
                        <strong className="text-light" />e
                        <strong className="text-light" />n
                        <strong className="text-light" />t
                        <strong className="text-light" />{" "}
                        <strong className="text-light" />f
                        <strong className="text-light" />o
                        <strong className="text-light" />u
                        <strong className="text-light" />n
                        <strong className="text-light" />d
                        <strong className="text-light" />!
                        <strong className="text-light" />
                      </div>
                      <div className="search-path" />
                    </a>
                  </div>
                </div>
              </div>
              <nav className="mt-2">
                <ul
                  className="nav nav-pills nav-sidebar flex-column"
                  data-widget="treeview"
                  role="menu"
                  data-accordion="false"
                  style={{ height:1000 }}
                >
                  <li className="nav-item">
      <Link to={"/"}  className="nav-link ">
        <i className={"pi pi-home"}  />
        <p style={{ marginLeft:5 ,userSelect:'none'}}>
          Trang chủ
        </p>
      </Link>
      </li>
                {menuData.map((data)=>(
                  <MenuItems key={data.title} title={data.title}  items={data.items} claims={user.claims} roles={user.roles} icon={data.icon}/>
                ))}
                </ul>
              </nav>
              {/* /.sidebar-menu */}
            </div>
          </div>
        </div>
        <div className="os-scrollbar os-scrollbar-horizontal os-scrollbar-unusable os-scrollbar-auto-hidden">
          <div className="os-scrollbar-track">
            <div
              className="os-scrollbar-handle"
              style={{ width: "100%", transform: "translate(0px, 0px)" }}
            />
          </div>
        </div>
        <div className="os-scrollbar os-scrollbar-vertical os-scrollbar-unusable os-scrollbar-auto-hidden">
          <div className="os-scrollbar-track">
            <div
              className="os-scrollbar-handle"
              style={{ height: "100%", transform: "translate(0px, 0px)" }}
            />
          </div>
        </div>
        <div className="os-scrollbar-corner" />
      </div>
      {/* /.sidebar */}
    </aside>
  );
}

export default Sidebar;
