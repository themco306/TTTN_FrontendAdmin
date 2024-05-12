import { PrimeIcons } from "primereact/api";
import { Button } from "primereact/button";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ContentHeader from "../../components/ContentHeader";
import ContentMain from "../../components/ContentMain";
import { userApi } from "../../api/userApi";
import appUrl from "../../api/appUrl";

function UserShow() {
  const navigate = useNavigate();
  const location = useLocation();
  const userId = location.state.id;
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await userApi.get(userId);
        if (res.status === 200) {
          setUserData(res.data);
          setLoading(false);
        }
      } catch (e) {
        console.error(e);
      }
    };
    fetchData();
  }, [userId]);
  return (
    <>
      <ContentHeader
        currentPage={"Chi Tiết tài khoản"}
        previousPage={"Tài Khoản"}
        previousPath={"/user"}
      />
      <ContentMain>
        {!loading && userData && (
          <div className="row">
            <div className="col-md-7">
              <p>
                <strong>Họ:</strong> {userData.firstName}
              </p>
              <p>
                <strong>Tên:</strong> {userData.lastName}
              </p>
              <p>
                <strong>Tên tài khoản:</strong> {userData.userName}
              </p>
              <p>
                <strong>Email:</strong> {userData.email}
              </p>
              <p>
                <strong>Điện thoại:</strong> {userData.phoneNumber}
              </p>
              <p>
                <strong>Đã xác thực Email:</strong>{" "}
                {userData.emailConfirmed ? "Đã xác thực" : "Chưa xác thực"}
              </p>
              <p>
                <strong>Gới tính:</strong> {userData.gender ? "Nam" : "Nữ"}
              </p>
              <p>
                <strong>Quyền:</strong> {userData.roles.join(", ")}
              </p>
              <p>
                <strong>Quyền chi tiết:</strong>{" "}
                {userData.claims.map((claim, index) => (
                  <div key={index}>
                    <span style={{ color: "GrayText", fontWeight: "bold" }}>
                      -{claim.claimType}
                    </span>
                    {"("}
                    {claim.claimValues.map((value, valueIndex) => (
                      <span key={valueIndex}>{value} </span>
                    ))}
                    {")"}
                  </div>
                ))}
              </p>
            </div>
            <div className="col-md-5">
              <div style={{ display: "flex", justifyContent: "flex-end" }}>
                <Button
                  icon={PrimeIcons.USER_EDIT}
                  label="Sửa"
                  className="m-3"
                  raised
                  rounded
                  onClick={() =>
                    navigate("/user/edit", { state: { id: userData.id } })
                  }
                />
              </div>
              <img src={appUrl.avatarURL+userData.avatar} style={{ width:150 }}/>
            </div>
          </div>
        )}
      </ContentMain>
    </>
  );
}

export default UserShow;
