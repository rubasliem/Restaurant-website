import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import * as Yup from 'yup';
import { useFormik } from "formik";
import expiredImg from '../../images/expired.png'
import cvvImg from '../../images/cvv.png'
import creditNumberImg from '../../images/creditNumber.png'

function ConfirmOrder() {
  const cartItems = useSelector(state => state.cart.items);
  const navigate = useNavigate();


  const totalPrice = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    function backToCart(){
        navigate('/cart')
    }

      const formik = useFormik({
          initialValues: {
            userName: '',
            address: '',
            paymentMethod: '',
            cardNumber: '',
            expiry: '',
            cvv: '',   
           },


validationSchema: Yup.object({
  userName: Yup.string()
    .required('User Name is required')
    .min(4, 'min length is 4 char'),
  address: Yup.string()
    .required('User address is required')
    .min(10, 'min length is 10 char')
    .max(300, 'max length is 300 char'),
  paymentMethod: Yup.string()
    .required("Payment Method is required"),

  cardNumber: Yup.string().when("paymentMethod", {
    is: "credit",
    then: (schema) =>
      schema.matches(
        /^(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14})$/,
        "Card Number must be a valid Visa or MasterCard with 16 digits"
      ).required("Card Number is required"),
    otherwise: (schema) => schema.notRequired()
  }),

  expiry: Yup.string().when("paymentMethod", {
    is: "credit",
    then: (schema) =>
      schema.matches(
        /^(0[1-9]|1[0-2])\/([0-9]{2})$/,
        "Expiry Date must be in MM/YY format"
      ).required("Expiry is required"),
    otherwise: (schema) => schema.notRequired()
  }),

  cvv: Yup.string().when("paymentMethod", {
    is: "credit",
    then: (schema) =>
      schema.matches(/^[0-9]{3,4}$/, "CVV must be 3 or 4 digits only")
        .required("CVV is required"),
    otherwise: (schema) => schema.notRequired()
  }),
}),

  
           onSubmit: values => {
            navigate("/invoice", {
            state: {
            userName: values.userName,
            address: values.address,
            total: totalPrice,
            paymentMethod: values.paymentMethod,
             },
             });}
  
      })

  return (
    <div className="container my-5 w-75 ">
      <h2 className="text-center mb-4">Order Confirmation</h2>

      <div className="card shadow p-4">
      {cartItems.length === 0 ? (
        <p className="text-center">Your cart is empty 🛒</p>
      ) : (
        <>
          {/* Order Summary */}
          <ul className="list-group mb-3">
            {cartItems.map(item => (
              <li key={item.id} className="list-group-item d-flex justify-content-between align-items-center">
                <div className="d-flex align-items-center">
                  <img src={item.images[0]} alt={item.title} style={{ width: "60px", marginRight: "10px" }} />
                  <span>{item.title} <strong> x {item.quantity}</strong></span>
                </div>
                <span className="text-success fw-bold">{item.price * item.quantity} EGP</span>
              </li>
            ))}
          </ul>

          <h4 className="text-end mb-3 me-3">Total: {totalPrice} EGP</h4>

          {/* Customer Details Form */}
          <form onSubmit={formik.handleSubmit} className="container w-75 ">
          <div className="mb-3 d-flex">
            <label className="form-label fw-bold me-4">Name </label>
                <input
                    type="text"
                    id="userName"
                    className="form-control form-control-lg w-50 me-3"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.userName}
                />
                      {formik.touched.userName && formik.errors.userName ? (
                        <div className="text-danger">{formik.errors.userName}</div>   
                      ) : null}
                    </div>

          <div className="mb-3 d-flex">
            <label className="form-label fw-bold me-2">Address</label>
            <input
                type="text"
                id="address"
                className="form-control form-control-lg w-50 me-3"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.address}
            />
                {formik.touched.address && formik.errors.address ? (
                <div className="text-danger">{formik.errors.address}</div>   
                ) : null}
                </div>

            <div className="mb-3 d-flex">
              <label className="form-label fw-bold me-1">Payment</label>
              <select
                id="paymentMethod"
                name="paymentMethod"
                className="form-select w-50 me-3"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.paymentMethod}
              >
                <option value="" disabled > just one payment Method</option>
                <option value="cash">Cash 💵</option>
                <option value="credit">Credit Card 💳</option>
              </select>
              {formik.touched.paymentMethod && formik.errors.paymentMethod && (
                <div className="text-danger">{formik.errors.paymentMethod}</div>
              )}
            </div>

                    {/* Credit Card Form */}
          {formik.values.paymentMethod === "credit" && (
            <div className="rounded-3 border p-3 m-3 w-57 ">
              <div className="mb-3 d-flex">
                <label className="form-label text-start">Card Number <img style={{  width: "25px"}} src={creditNumberImg}/></label>
                <input type="text" id="cardNumber" className="form-control form-control-lg w-50 ms-1 p-2 me-2"
                        placeholder="xxxx-xxxx-xxxx-xxxx"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.cardNumber}
                      />
                      {formik.touched.cardNumber && formik.errors.cardNumber ? (
                        <div className="text-danger">{formik.errors.cardNumber}</div>   
                      ) : null}
              </div>
              <div className="mb-3 d-flex">
                <label className="form-label me-5">Expiry <img style={{  width: "25px"}} src={expiredImg}/></label>
                <input type="text" id="expiry" className="form-control form-control-lg w-50 ms-2 p-2 me-2"
                        placeholder="MM/YY"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.expiry}
                      />
                      {formik.touched.expiry && formik.errors.expiry ? (
                        <div className="text-danger">{formik.errors.expiry}</div>   
                      ) : null}
              </div>
              <div className="mb-3 d-flex">
                <label className="form-label me-5">CVV <img style={{  width: "25px"}} src={cvvImg}/> </label>
                <input type="text" id="cvv" className="form-control form-control-lg w-50 ms-4 p-2 me-2" 
                        placeholder="xxx"  
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.cvv}
                      />
                      {formik.touched.cvv && formik.errors.cvv ? (
                        <div className="text-danger">{formik.errors.cvv}</div>   
                      ) : null}
              </div>
            </div>
          )}


        {/* Cash Form */}
             {/* {formik.values.paymentMethod === "cash" && (
                <div className="rounded-3 border p-3 ms-4 w-50">
                 You will pay upon delivery 💵
                 </div>
                )} */}


          {/* Confirm / Cancel Buttons */}
          <div className="d-flex justify-content-center gap-3 my-5">
            <button className="btn btn-outline-success fw-bold" type="submit" value="Submit">
              Confirm Order <i className="bi bi-check-circle-fill"></i>
            </button>
            <button className="btn btn-outline-danger fw-bold" onClick={(backToCart)}>
              Cancel Order <i className="bi bi-x-circle-fill"></i>
            </button>
          </div>
          </form>
        </>
      )}

      </div>

    </div>
  );
}

export default ConfirmOrder;
