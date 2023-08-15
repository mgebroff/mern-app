import { Form, redirect, Link, useNavigate } from "react-router-dom";
import { FormRow, Logo, SubmitBtn } from "../components";
import Wrapper from "../assets/wrappers/RegisterAndLoginPage";
import customFetch from "../utils/customFetch";
import { toast } from "react-toastify";

/******************* ACTION *************************************************/
export const action = async ({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  try {
    await customFetch.post("/auth/login", data);
    toast.success("Login successfully");
    return redirect("/dashboard");
  } catch (error) {
    toast.error(error?.response?.data?.msg);
    return error;
  }
};

/******************* LOGIN **************************************************/
const Login = () => {
  const navigate = useNavigate();

  const loginDemoUser = async () => {
    const data = {
      email: "test@test.com",
      password: "secret123",
    };

    try {
      await customFetch.post("/auth/login", data);
      toast.success("Test an application");
      navigate("/dashboard");
    } catch (error) {
      toast.error(error?.response?.data?.msg);
      return error;
    }
  };

  return (
    <Wrapper>
      <Form method="post" className="form">
        <Logo />
        <h4>Login</h4>

        <FormRow type="email" name="email" defaultValue=" " />
        <FormRow type="password" name="password" defaultValue="xxxxxxx" />
        <SubmitBtn formBtn />
        <br />
        <br />
        <button type="submit" className="btn btn-block" onClick={loginDemoUser}>
          explore the app
        </button>
        <center>
          <p>
            Not a member? &nbsp;
            <Link to="/register" className="member-btn">
              Register
            </Link>
          </p>
        </center>
      </Form>
    </Wrapper>
  );
};

/******************* EXPORT *************************************************/
export default Login;
