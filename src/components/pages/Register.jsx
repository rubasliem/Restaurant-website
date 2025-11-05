import { useFormik } from "formik";
import * as Yup from 'yup';
import { useNavigate } from "react-router";
import { toast } from "react-toastify";

function Register() {

  const navigate = useNavigate();

    const formik = useFormik({
        initialValues: {
          userName: '',
          password: '',
          confPassword: '',
          phone: '',
          email: '',   
         },
         validationSchema: Yup.object({
            userName: Yup.string()
            .required('User Name is required')
            .min(4, 'min length is 4 char')
            .matches(/^\S*$/, 'User Name cannot contain spaces') ,
            email: Yup.string()
           .matches(/^[a-zA-Z0-9._%+-]+@gmail\.com$/,'Email must be a valid Gmail address characters and numbers @gmail.com')
           .required('Email is required'),
            phone: Yup.string()
            .matches(/^(010|011|012|015)[0-9]{8}$/, 'Phone must start with 010, 011, 012, or 015 and be 11 digits long')
            .required('Phone is required'),
            password: Yup.string()                 //Valid Password P@ssw0rd123
            .required('Password is required')
            .min(8, 'min length is 8 char')
            .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, 'password must contain at least one lowercase letter, one uppercase letter , one digit , and one special character'),
            confPassword: Yup.string()
            .oneOf([Yup.ref('password'), null], 'Passwords must match')
            .required('Confirm Password is required'),  

         }),

         onSubmit: values => {
          console.log(values);
          toast.success(`Register Successfully ✔️
thank you ${values.userName}🌷❤️ ...`)
          navigate('/login')}

    })


  return (
    <>
      <section className=" w-100 d-flex justify-content-center align-items-center">
        <div className="container-fluid h-custom">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-md-9 col-lg-6 col-xl-5">
              <img
                src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
                className="img-fluid"
                alt="Sample"
              />
            </div>
            <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
              <h3 className="mb-4 pb-2 pb-md-0 mb-md-5">Registration Form  <i class="bi bi-person-plus-fill"></i></h3>

              <form onSubmit={formik.handleSubmit}>
                <div className="row my-3">
                    <div className="form-outline d-block text-start">
                      <label className="form-label fw-bold ">Name : </label>
                      <input
                        type="text"
                        id="userName"
                        className="form-control form-control-lg"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.userName}
                      />
                      {formik.touched.userName && formik.errors.userName ? (
                        <div className="text-danger">{formik.errors.userName}</div>   
                      ) : null}
                    </div>
                  </div>
             

                <div className="row">
                    <div className="form-outline d-block text-start">
                      <label className="form-label fw-bold ">Email : </label>
                      <input
                        type="email"
                        id="email"
                        className="form-control form-control-lg"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.email}
                      />
                      {formik.touched.email && formik.errors.email ? (
                        <div className="text-danger">{formik.errors.email}</div>   
                      ) : null}
                    </div>
                  </div>


                  <div className="row my-3">
                    <div className="form-outline d-block text-start">
                      <label className="form-label fw-bold ">Mopile : </label>
                      <input
                        type="tel"
                        id="phone"
                        className="form-control form-control-lg"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.phone}
                      />
                      {formik.touched.phone && formik.errors.phone ? (
                        <div className="text-danger">{formik.errors.phone}</div>   
                      ) : null}
                    </div>
                  </div>
                

                <div className="row">
                  <div className="col-md-6 mb-4 pb-2">
                    <div className="form-outline d-block text-start">
                      <label className="form-label fw-bold ">Password : </label>
                      <input
                        type="password"
                        id="password"
                        className="form-control form-control-lg"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.password}
                      />
                      {formik.touched.password && formik.errors.password ? (
                        <div className="text-danger">{formik.errors.password}</div>   
                      ) : null}
                    </div>
                  </div>

                  <div className="col-md-6 mb-4 pb-2">
                    <div className="form-outline d-block text-start">
                      <label className="form-label fw-bold ">Confirm Password : </label>
                      <input
                        type="password"
                        id="confPassword"
                        className="form-control form-control-lg"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.confPassword}
                      />
                      {formik.touched.confPassword && formik.errors.confPassword ? (
                        <div className="text-danger">{formik.errors.confPassword}</div>   
                      ) : null}
                    </div>
                  </div>


                <div className="mt-4 pt-2 ">
                  <input
                    className="btn btn-outline-primary btn-lg"
                    type="submit"
                    value="Submit"
                  />
                </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Register;
