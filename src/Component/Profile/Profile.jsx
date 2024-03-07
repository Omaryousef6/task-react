import React, { useContext } from "react";
import { authContext } from "../../Context/AuthContext";
import { FallingLines } from "react-loader-spinner";

export default function Profile() {
  const { userData } = useContext(authContext);

  //  Loading screen

  if (!userData) {
    return (
      <div className="d-flex vh-100 bg-light bg-opacity-50 justify-content-center align-items-center">
        <FallingLines
          color="#0aad0a"
          width="150"
          visible={true}
          ariaLabel="falling-circles-loading"
        />
      </div>
    );
  }
  return (
    <>
      <div className="contianer">
        <h1>Hello Ya {userData.name}</h1>
      </div>
    </>
  );
}
