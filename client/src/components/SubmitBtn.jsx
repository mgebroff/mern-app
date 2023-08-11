import { useNavigate } from "react-router-dom";

const SubmitBtn = ({ formBtn }) => {
  const navigation = useNavigate();
  const isSubmitting = navigation.state === "submitting";

  return (
    <button
      type="submit"
      className={`btn btn-block ${formBtn && "form-btn"}`}
      disabled={isSubmitting}
    >
      {isSubmitting ? "submitting ..." : "submit"}
    </button>
  );
};

export default SubmitBtn;
