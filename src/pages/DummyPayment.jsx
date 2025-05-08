import { useLocation, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import axios from "axios";
import { resetCart } from "../slices/cartSlice";
import { BadgeCheck, Loader2, ShieldCheck } from "lucide-react";

export default function DummyPayment() {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);
  const [loading, setLoading] = useState(false);
  const { course } = location.state || {};

  const handleBuy = async () => {
    setLoading(true);
    try {
      await axios.post(
        "http://localhost:5000/api/v1/payment/dummyEnroll",
        { coursesId: [course._id] },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      dispatch(resetCart());
      navigate("/dashboard/enrolled-courses");
    } catch (err) {
      console.error("Enrollment failed!", err?.response || err);
      alert("Enrollment failed! " + (err?.response?.data?.message || ""));
    }
    setLoading(false);
  };

  if (!course) return (
    <div className="flex items-center justify-center min-h-[60vh] text-xl text-richblack-200">
      No course info provided.
    </div>
  );

  return (
    <div className="flex items-center justify-center min-h-[80vh] bg-richblack-900 px-2">
      <div className="w-full max-w-md rounded-xl bg-richblack-800 shadow-lg border border-richblack-700 p-8 flex flex-col items-center gap-6">
        <div className="flex flex-col items-center gap-2">
          <ShieldCheck className="text-yellow-300 w-10 h-10 mb-2" />
          <h2 className="text-3xl font-bold text-richblack-5 mb-1">Confirm Payment</h2>
          <p className="text-richblack-200 text-center text-base">
            You’re about to enroll in <span className="font-semibold text-yellow-100">{course.courseName}</span>
          </p>
        </div>
        <div className="w-full flex flex-col gap-2 bg-richblack-700 rounded-lg p-4">
          <div className="flex justify-between items-center">
            <span className="text-richblack-200">Course</span>
            <span className="text-richblack-5 font-medium">{course.courseName}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-richblack-200">Category</span>
            <span className="text-richblack-5">{course.category?.name || "N/A"}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-richblack-200">Price</span>
            <span className="text-yellow-100 font-bold text-lg">₹{course.price}</span>
          </div>
        </div>
        <button
          onClick={handleBuy}
          disabled={loading}
          className="w-full flex items-center justify-center gap-2 bg-yellow-100 hover:bg-yellow-200 text-richblack-900 font-semibold py-3 rounded-lg transition-all disabled:opacity-60 disabled:cursor-not-allowed text-lg shadow"
        >
          {loading ? (
            <>
              <Loader2 className="animate-spin w-5 h-5" />
              Processing...
            </>
          ) : (
            <>
              <BadgeCheck className="w-5 h-5" />
              Buy & Enroll
            </>
          )}
        </button>
        <p className="text-xs text-richblack-400 flex items-center gap-1 mt-2">
          <ShieldCheck className="w-4 h-4 text-yellow-200" />
          100% Secure Dummy Payment. No actual money will be deducted.
        </p>
      </div>
    </div>
  );
}