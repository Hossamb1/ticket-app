import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaUser } from "react-icons/fa";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import { register } from "../features/auth/authSlice";
import Spinner from "../components/spinner";

function Register() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isLoading } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    password2: "",
  });

  const { firstName, lastName, email, password, password2 } = formData;

  function handleChange(e) {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  }

  function onSubmit(e) {
    e.preventDefault();

    if (password !== password2) {
      toast.error("Passwords do not match");
    }

    const userData = {
      name: firstName + " " + lastName,
      email,
      password,
    };

    dispatch(register(userData))
      .unwrap()
      .then((user) => {
        toast.success(`Registered new user - ${user.name}`);
        navigate("/");
      })
      .catch(toast.error);
  }

  return isLoading ? (
    <Spinner />
  ) : (
    <>
      <section className="heading">
        <h1>
          <FaUser /> Register
        </h1>
        <p>Please create an account</p>
      </section>

      <section className="form">
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <input
              type="text"
              className="form-control first-name"
              id="first-name"
              name="firstName"
              value={firstName}
              onChange={handleChange}
              placeholder=""
              required
            />
            <span className="floating-label">First name</span>
            <input
              type="text"
              className="form-control last-name"
              id="last-name"
              name="lastName"
              value={lastName}
              onChange={handleChange}
              placeholder=""
              required
            />
            <span className="floating-label">Last name</span>
          </div>
          <div className="form-group">
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              value={email}
              onChange={handleChange}
              placeholder=""
              autoComplete="email"
              required
            />
            <span className="floating-label">Your email address</span>
          </div>
          <div className="form-group">
            <input
              type="password"
              className="form-control"
              id="password"
              name="password"
              value={password}
              onChange={handleChange}
              placeholder=""
              required
              autoComplete="new-password"
            />
            <span className="floating-label">Password</span>
          </div>
          <div className="form-group">
            <input
              type="password"
              className="form-control"
              id="password2"
              name="password2"
              value={password2}
              onChange={handleChange}
              placeholder=""
              required
            />
            <span className="floating-label">Confirm password</span>
          </div>
          <div className="form-group">
            <button className="btn btn-block">Submit</button>
          </div>
        </form>
      </section>
    </>
  );
}

export default Register;
