import { useDispatch, useSelector } from "react-redux";
import "./toast.css";
import { hideToast, selectToast } from "./toastSlice";

export function Toast() {
  const toast = useSelector(selectToast);
  const dispatch = useDispatch();
  return (
    <div className={`toast ${toast.isVisible} bg-teal-400 text-white`}>
      {toast.message}
      <button className="icon--button" onClick={() => dispatch(hideToast())}>
        <em className="fa fa-xmark icon--xmark"></em>
      </button>
    </div>
  );
}
