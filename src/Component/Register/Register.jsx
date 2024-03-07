import  axios  from 'axios';
import { useFormik } from 'formik'
import React, { useState } from 'react'
import { ColorRing } from 'react-loader-spinner';
import { Link, useNavigate } from 'react-router-dom';
import * as yup from 'yup'



export default function Register() {
  // ! Btn Spinner
  const [isloading, setIsLoading] = useState(false)
  const [succes, setSucces] = useState(false)
  const [err , setErr] = useState(undefined)
  let navigate = useNavigate()

  const userData = {
    name:'',
    email:'',
    phone:'',
    password:'',
    rePassword:'',
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



 async function mySubmit(values){ 

    setIsLoading(true);

    console.log(  'submietttt...' , values );
    
    await axios.post('https://ecommerce.routemisr.com/api/v1/auth/signup' , values  )
    .then((err)=>{
      console.log('success' , err);
      setSucces(true)

      setTimeout(()=>{
        setSucces(false)
        navigate('/login')
      }  , 2000)

      setIsLoading(false)
    })
    .catch((err)=>{
      // console.log('error' , err.response.data.message);
      setErr(err.response.data.message)
      setTimeout(()=>{
        setErr(undefined)
      }  , 2000)

      setIsLoading(false)

    })



    // ^ Conspt (Try-Catch)
    // try{
    //   const res   =  await axios.post('https://ecommerce.routemisr.com/api/v1/auth/signup' , values  )
    //   console.log(res.data);
    // }
    // catch(err){
    //   console.log('error' , err );
    // }
  };

  function validate(values){
    const errors = {};
    
    const nameRegex = /^[A-Z][a-z]{3,7}$/;
    const phoneRegex = /^01[0125][0-9]{8}$/;
    
    // ^if(!values.name => input =""){}
    if(nameRegex.test(values.name) === false){
      errors.name = 'Name must be from 4 to 8 characters starts with capital letter'
    }
    if(!values.email){
      errors.email = 'Email It Requaired'
    } else if (values.email.includes('@') !== true || values.email.includes('.') !== true){
      errors.email = ' Email must be in format'
    }

    if(phoneRegex.test(values.phone)  === false){
      errors.phone = 'phone must be an Egyption Number'
    }

    if(values.password.length < 6 || values.password > 12){
      errors.password = 'password must be form 6 to 12 character '
    }

    if(values.rePassword !== values.password){
      errors.rePassword = 'Repassword Dont Match '
    }

    
    // return your errors
    return errors;
  }

  // function mySubmit(e){
  //     e.preventDefault()
  //     console.log("hello");
  // }

  // Formik => libarery => handle form state 
  // optiantal => validate your inputs
  // hook => useFormik
  
  const myFormik =  useFormik({

    initialValues: userData,

    onSubmit: mySubmit,
    // ! If name func == name validate don't repeat (validate).
    validate,


    
  })





  return <>

    <div className="w-75 m-auto p-5">

      <h2 className='mb-5 border-bottom border-3 d-inline-block fw-bolder text-muted'>Regsiter now :</h2>

      <form  onSubmit={ myFormik.handleSubmit}>

        {/* <label htmlFor="name" className="ps-2">name:</label> */}
        {/* Two Steps To Get Value In Input (name:'' /  value:{}) */}
        <input onBlur={myFormik.handleBlur} onChange={myFormik.handleChange} name='name' id='name' type="text" placeholder='name' className='form-control border-bottom shadow-none border-0 mb-5'/>
        {myFormik.errors.name && myFormik.touched.name ? <div className="alert alert-transparent text-danger py-1">{myFormik.errors.name}</div> : ''}

        {/* <label htmlFor="email" className="ps-2">email:</label> */}
        <input onBlur={myFormik.handleBlur} onChange={myFormik.handleChange} value={myFormik.values.email} id='email' type="email" placeholder='email' className='form-control border-bottom shadow-none border-0 mb-5'/>
        {myFormik.errors.email  && myFormik.touched.email ? <div className="alert alert-transparent text-danger py-1">{myFormik.errors.email}</div> : ''}


        {/* <label htmlFor="phone" className="ps-2">phone:</label> */}
        <input onBlur={myFormik.handleBlur} onChange={myFormik.handleChange} value={myFormik.values.phone} id='phone' type="text" placeholder='phone' className='form-control border-bottom shadow-none border-0 mb-5'/>
        {myFormik.errors.phone  && myFormik.touched.phone ? <div className="alert alert-transparent text-danger py-1">{myFormik.errors.phone}</div> : ''}
        

        {/* <label htmlFor="password" className="ps-2">password:</label> */}
        <input onBlur={myFormik.handleBlur} onChange={myFormik.handleChange} value={myFormik.values.password} id='password' type="password" placeholder='password' className='form-control border-bottom shadow-none border-0 mb-5'/>
        {myFormik.errors.password  && myFormik.touched.password ? <div className="alert alert-transparent text-danger py-1">{myFormik.errors.password}</div> : ''}
        

        {/* <label htmlFor="rePassword" className="ps-2">rePassword:</label> */}
        <input onBlur={myFormik.handleBlur} onChange={myFormik.handleChange} value={myFormik.values.rePassword} id='rePassword' type="password" placeholder='rePassword' className='form-control border-bottom shadow-none border-0 mb-3'/>
        {myFormik.errors.rePassword  && myFormik.touched.rePassword ? <div className="alert alert-transparent text-danger py-1">{myFormik.errors.rePassword}</div> : ''}
        
        {succes ?  <div className="alert alert-success w-50 text-center m-auto py-1">Congaretltion Your Creat Account</div> : ""}

        {err ? <div className="alert alert-danger w-50 text-center m-auto py-1">{err}</div> : "" }

       
        <button disabled={! (myFormik.isValid && myFormik.dirty)} type='submit'  className='border-0 bg-main btn text-white'>
          {isloading ?  
                  (<ColorRing
                    visible={true}
                    height="40"
                    width="40"
                    ariaLabel="color-ring-loading"
                    wrapperStyle={{}}
                    wrapperClass="color-ring-wrapper"
                    colors={['#fff', '#fff', '#fff', '#fff', '#fff']}
                  />)
                  : 'Register'}
        </button> 
        



        <Link className='m-3 pb-1 fw-semibold border-bottom border-2 border-dark ' to="/login">Login Now</Link>

      </form>

    </div>
  
  
  </>
}
