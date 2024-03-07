import axios from "axios";
import { useFormik } from "formik";
import React, { useContext, useState } from "react";
import { ColorRing } from "react-loader-spinner";
import { Link, useNavigate } from "react-router-dom";
import { authContext } from "../../Context/AuthContext";

export default function Login() {
  const [isloading, setIsLoading] = useState(false);
  const [succes, setSucces] = useState(false);
  const [err, setErr] = useState(undefined);
  let navigate = useNavigate();
  const { token, setToken, getUserDataToken } = useContext(authContext);

  const userData = {
    email: "",
    password: "",
  };

  // ! Yup Library
  //   const mySchema = yup.object({
  //     name:yup.string().required('Name must be req.').min(3 , 'at lest 3 characters').max(6 ,'at lest 6 characters'),
  //     phone:yup.string().required().matches(/^01[125][0-9]{8}$/ , 'Must Enter Egyption Number'),
  //     email:yup.string().required('Email Enter').email('Must Enter Email'),
  //     password:yup.string().min(6).max(12),
  //*    rePassword:yup.string().oneOf([yup.ref('password')] , "password and repassword dont match"),
  // })

  // validationSchema: mySchema

  async function loginSubmit(values) {
    setIsLoading(true);
    await axios
      .post("https://ecommerce.routemisr.com/api/v1/auth/signin", values)
      .then((res) => {
        if (res.data.message === "success") {
          localStorage.setItem("tkn", res.data.token);
          setToken(res.data.token);

          
          setSucces(true);
          
          setTimeout(() => {
            setSucces(false);
            navigate("/product");
          }, 1000);
          getUserDataToken()
          setIsLoading(false);
        }
      })
      .catch((err) => {
        // console.log('error' , err.response.data.message);
        setErr(err.response.data.message);
        setTimeout(() => {
          setErr(undefined);
        }, 5000);

        setIsLoading(false);
      });
    // ^ Conspt (Try-Catch)
    // try{
    //   const res   =  await axios.post('https://ecommerce.routemisr.com/api/v1/auth/signup' , values  )
    //   console.log(res.data);
    // }
    // catch(err){
    //   console.log('error' , err );
    // }
  }

  function validate(values) {
    const errors = {};

    // ^if(!values.name => input =""){}

    if (!values.email) {
      errors.email = "Email It Requaired";
    } else if (
      values.email.includes("@") !== true ||
      values.email.includes(".") !== true
    ) {
      errors.email = " Email must be in format";
    }

    if (values.password.length < 6 || values.password > 12) {
      errors.password = "password must be form 6 to 12 character ";
    }

    // return your errors
    return errors;
  }

  const myFormik = useFormik({
    initialValues: userData,

    onSubmit: loginSubmit,
    // ! If name func == name validate don't repeat (validate).
    validate,
  });

  return (
    <>
      <div className="w-75 m-auto p-5">
        <h2 className="mb-5 border-bottom border-3 d-inline-block fw-bolder text-muted ">
          Login :
        </h2>

        <form onSubmit={myFormik.handleSubmit}>
          {err ? (
            <div className="alert alert-danger w-50 text-center m-auto py-1">
              {err}
            </div>
          ) : (
            ""
          )}
          {/* <label htmlFor="email" className="ps-2">email:</label> */}
          <input
            onBlur={myFormik.handleBlur}
            onChange={myFormik.handleChange}
            value={myFormik.values.email}
            id="email"
            type="email"
            placeholder="email"
            className="form-control border-bottom shadow-none border-0 mb-5"
          />
          {myFormik.errors.email && myFormik.touched.email ? (
            <div className="alert alert-transparent text-danger py-1">
              {myFormik.errors.email}
            </div>
          ) : (
            ""
          )}

          {/* <label htmlFor="password" className="ps-2">password:</label> */}
          <input
            onBlur={myFormik.handleBlur}
            onChange={myFormik.handleChange}
            value={myFormik.values.password}
            id="password"
            type="password"
            placeholder="password"
            className="form-control border-bottom shadow-none border-0 mb-5"
          />
          {myFormik.errors.password && myFormik.touched.password ? (
            <div className="alert alert-transparent text-danger py-1">
              {myFormik.errors.password}
            </div>
          ) : (
            ""
          )}

          {succes ? (
            <div className="alert alert-success w-50 text-center m-auto py-1">
              Welcome Back
            </div>
          ) : (
            ""
          )}

          <button
            disabled={!(myFormik.isValid && myFormik.dirty)}
            type="submit"
            className="border-0 bg-main btn text-white"
          >
            {isloading ? (
              <ColorRing
                visible={true}
                height="25"
                width="25"
                ariaLabel="color-ring-loading"
                wrapperStyle={{}}
                wrapperClass="color-ring-wrapper"
                colors={["#fff", "#fff", "#fff", "#fff", "#fff"]}
              />
            ) : (
              "Login"
            )}
          </button>

          <Link
            className="m-3 pb-1 fw-semibold border-bottom border-2 border-dark "
            to="/register"
          >
            Register
          </Link>
        </form>
      </div>
    </>
  );
}
