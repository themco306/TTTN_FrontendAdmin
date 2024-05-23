import React from "react";
import { Link } from "react-router-dom";
import AppRole from "../helpers/AppRole";

function MenuItems({ title, items = [], claims = [], roles = [],icon="" }) {
  console.log(claims)
  const isSuperAdmin = roles.includes(AppRole.SuperAdmin) ? true : false;
  const hasAccess = items.some(item => {
    if (isSuperAdmin) return true;
    const claim = claims.find(claim => claim.claimType === item.claimType);
    return claim && claim.claimValues.includes(item.claimValue);
  });
  const hasClaim = (item) => {
    if (isSuperAdmin) return true;
    if (!claims) return false; // Nếu là SuperAdmin, cho phép truy cập
    const claim = claims.find(claim => claim.claimType === item.claimType);
    if (!claim) return false; // Nếu không có claimType tương ứng, không cho phép truy cập
    return  claim.claimValues.includes(item.claimValue); // Kiểm tra xem có giá trị Add trong claimValues không
  };
  const style = !hasAccess ? { display: "none" } : {};
  return (
    <li className="nav-item" style={style}>
      <a  className="nav-link ">
        <i className={icon}  />
        <p style={{ marginLeft:5 ,userSelect:'none'}}>
          {title}
        </p>
      </a>
      <ul className="nav nav-treeview" style={{ display: "none" }}>
        {items.map(
          (item) =>
          hasAccess&&(
            hasClaim(item) && ( // Kiểm tra mục menu có quyền tương ứng không
              <li className="nav-item" key={item.title}>
                <Link to={item.path} className="nav-link">
                  <i className={"pi pi-plus"} />
                  <p style={{ marginLeft:5 ,userSelect:'none'}}>{item.title}</p>
                </Link>
              </li>
            )
          )
            
        )}
      </ul>
    </li>
  );
}

export default MenuItems;
