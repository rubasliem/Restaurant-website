import { useLocation, useNavigate } from "react-router";

function Invoice() {
  const { state } = useLocation();
  const navigate = useNavigate();

  if (!state) {
    return <p className="text-center mt-5">No order data found ❌</p>;
  }

  const { userName, address, total, paymentMethod } = state;

  return (
    <div className="container my-5 w-75">
      <h2 className="text-center mb-4">Order Summary</h2>

      <div className="card shadow p-4">
        <p><strong>Name : </strong> {userName}</p>
        <p><strong>Address : </strong> {address}</p>
        <p><strong>Total Amount : </strong> {total} EGP 💰</p>
        <p>
          <strong>Payment Method:</strong>{" "}
          {paymentMethod === "cash" ? "Cash 💵" : "Credit Card 💳"}
        </p>
        <p className="fw-bold text-success">
          {paymentMethod === "cash"
            ? "You will pay upon delivery :💡  "
            : "Payment was successfully charged 👍"}
        </p>
        <p> Thank you {userName}🌷The order Confirmed Successfully ✔️ wait for the meal to arrive 🚗 </p>

      </div>

      <div className="text-center mt-4">
        <button
          className="btn btn-outline-secondary"
          onClick={() => navigate("/")}
        >
          Back to Home
        </button>
      </div>
    </div>
  );
}

export default Invoice;
