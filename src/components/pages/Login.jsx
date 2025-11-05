import { useFormik } from "formik";
import * as Yup from 'yup';
import { useNavigate } from "react-router";
import { toast } from "react-toastify";

function Login() {

  
  const navigate = useNavigate();

    const formik = useFormik({
        initialValues: {
          email: '', 
          password: '',
         },
         validationSchema: Yup.object({
            email: Yup.string()
            .email('Invalid email address')
            .required('Email is required'),
            password: Yup.string()
            .min(6, 'min length is 6 char')
            .max(20, 'max length is 20 char') , 

         }),

         onSubmit: values => {
          console.log(values);
          toast.success(`Register Successfully ✔️thank you🌷❤️ ...`)
          navigate('/')}

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
              <form onSubmit={formik.handleSubmit}>
                <div className="d-flex flex-row align-items-center justify-content-center justify-content-lg-start">
                  <p className="lead fw-normal mb-0 me-3">Sign in with </p>
                  <button type="button" className="btn btn-primary btn-floating mx-1">
                    <i className="fab fa-facebook-f"></i>
                  </button>
                  <button type="button" className="btn btn-primary btn-floating mx-1">
                    <i className="fab fa-twitter"></i>
                  </button>
                  <button type="button" className="btn btn-primary btn-floating mx-1">
                    <i className="fab fa-linkedin-in"></i>
                  </button>
                </div>

                <div className="divider d-flex align-items-center my-4">
                  <p className="text-center fw-bold mx-3 mb-0">Or</p>
                </div>

                <form onSubmit={formik.handleSubmit}></form>
                <div className="form-outline mb-4  d-block text-start">
                      <label className="form-label fw-bold ">Email Address : </label>
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

                <div className="form-outline mb-3 d-block text-start">
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

                <div className="text-center text-lg-start mt-4 pt-2">
                  <button
                    type="submit"
                    value="Submit"
                    className="btn btn-outline-primary btn-lg"
                    style={{ paddingLeft: '2.5rem', paddingRight: '2.5rem' }}
                  >
                    Login
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Login;
