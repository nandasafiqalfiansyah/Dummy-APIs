import React, { Fragment, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ReCAPTCHA from "react-google-recaptcha";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Input,
  Checkbox,
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";

function LoginCard({ setAuth }) {
  const [rememberMe, setRememberMe] = useState(false);
  const [open, setOpen] = React.useState(false);
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });
  const [recaptchaValue, setRecaptchaValue] = useState(null);

  const { email, password } = inputs;

  const handleOpen = () => setOpen(!open);

  const onChange = (e) =>
    setInputs({ ...inputs, [e.target.name]: e.target.value });

  const onSubmitForm = async (e) => {
    e.preventDefault();

    if (!rememberMe) {
      setOpen(!open);
      return; // Exit early if the `rememberMe` condition is not met
    }

    if (!recaptchaValue) {
      toast.error("Please complete the CAPTCHA");
      return; // Exit early if CAPTCHA is not completed
    }

    try {
      const body = { email, password, recaptchaValue };
      const response = await fetch(
        "https://rest-dummy-api.vercel.app/user/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(body),
        }
      );

      const parseRes = await response.json();

      // Handle different HTTP status codes
      const errorStatusCodes = [404, 400, 500, 401, 403];
      if (errorStatusCodes.includes(parseRes.statusCode)) {
        toast.error(parseRes.message || "An error occurred");
        setAuth(false);
      } else if (parseRes.payload && Object.keys(parseRes.payload).length > 0) {
        localStorage.setItem("token", parseRes.payload);
        setAuth(true);
        toast.success("Logged in Successfully", {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 1000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: false,
          progress: undefined,
          bodyClassName: "toast-body",
        });
      } else {
        setAuth(false);
        toast.error(parseRes);
      }
    } catch (err) {
      toast.error("Something went wrong");
      console.error(err.message);
    }
  };

  const handleRecaptchaChange = (value) => {
    setRecaptchaValue(value);
  };

  return (
    <Fragment>
      <div className="py-12">
        <Dialog open={open} handler={handleOpen}>
          <DialogHeader>Terms of Service</DialogHeader>
          <DialogBody>
            By using our API service, you agree to abide by the following terms
            and conditions. Our API service is provided to you on an "as is" and
            "as available" basis without any warranty or guarantee. We reserve
            the right to modify or terminate the service for any reason, without
            notice, at any time. You are solely responsible for your use of the
            API and any consequences that may arise from it. Unauthorized use of
            our API service may result in termination of your account and legal
            action.
          </DialogBody>
          <DialogBody>by nanda safiq alfiansyah</DialogBody>
          <DialogFooter>
            <Button
              variant="text"
              color="red"
              onClick={handleOpen}
              className="mr-1"
            >
              <a href="/">
                <span>Cancel</span>
              </a>
            </Button>

            <Button variant="gradient" onClick={handleOpen}>
              <span>Agree</span>
            </Button>
          </DialogFooter>
        </Dialog>

        <Card className="w-96 m-auto">
          <CardHeader
            variant="gradient"
            color="gray"
            className="mb-4 grid h-28 place-items-center"
          >
            <Typography variant="h3" color="white">
              Login
            </Typography>
          </CardHeader>
          <form onSubmit={onSubmitForm}>
            <CardBody className="flex flex-col gap-4">
              <Input
                type="email"
                name="email"
                value={email}
                label="Email"
                onChange={(e) => onChange(e)}
                size="lg"
                required
              />
              <Input
                label="Password"
                type="password"
                value={password}
                name="password"
                onChange={(e) => onChange(e)}
                size="lg"
                required
              />
              <div className="-ml-2.5">
                <Checkbox
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  label="Agree to terms of this website"
                />
              </div>
              <ReCAPTCHA
                sitekey="6LcX8iAqAAAAALK2sCidHZog0Yy4tlMk4ZuBqGb8"
                onChange={handleRecaptchaChange}
              />
            </CardBody>
            <CardFooter className="pt-0">
              <Button type="submit" variant="gradient" fullWidth>
                Login
              </Button>

              <Typography variant="small" className="mt-6 flex justify-center">
                Don&apos;t have an account?
                <Typography
                  as="a"
                  href="/signin"
                  variant="small"
                  color="blue-gray"
                  className="ml-1 font-bold"
                >
                  Sign In
                </Typography>
              </Typography>
            </CardFooter>
          </form>
        </Card>
      </div>
    </Fragment>
  );
}

export default LoginCard;
