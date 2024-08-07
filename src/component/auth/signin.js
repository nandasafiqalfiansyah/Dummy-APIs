import React, { useState } from "react";
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
import { toast } from "react-toastify";

export function SignCard({ setAuth }) {
  const [rememberMe, setRememberMe] = useState(false);
  const [open, setOpen] = useState(false);
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
    name: "",
  });

  const { email, password, name } = inputs;
  const handleOpen = () => setOpen(!open);
  const onChange = (e) =>
    setInputs({ ...inputs, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!rememberMe) {
        setOpen(true);
        return;
      }
      const body = { email, password, name };
      const response = await fetch(
        "https://rest-dummy-api.vercel.app/user/register",
        {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify(body),
        }
      );
      const parseRes = await response.json();
      console.log(parseRes);
      const errorStatusCodes = [404, 400, 500, 401, 403];
      if (errorStatusCodes.includes(parseRes.statusCode)) {
        toast.error(parseRes.message || "An error occurred");
        setAuth(false);
      } else if (parseRes.statusCode === 200) {
        await toast.success("Register Successfully");
        window.location.href = "/login";
      } else {
        toast.error(parseRes);
        return;
      }
    } catch (err) {
      toast.error("Something went wrong");
      return;
    }
  };

  return (
    <div className="py-12">
      <Dialog open={open} handler={handleOpen}>
        <DialogHeader>Terms of Service</DialogHeader>
        <DialogBody>
          By using our API service, you agree to abide by the following terms
          and conditions. Our API service is provided to you on an "as is" and
          "as available" basis without any warranty or guarantee. We reserve the
          right to modify or terminate the service for any reason, without
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
            className="mr-1"
            onClick={handleOpen}
          >
            <span>Cancel</span>
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
            Sign in
          </Typography>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardBody className="flex flex-col gap-4">
            <Input
              type="text"
              label="Name"
              name="name"
              value={name}
              onChange={onChange}
              size="lg"
              required
            />
            <Input
              type="email"
              label="Email"
              name="email"
              value={email}
              onChange={onChange}
              size="lg"
              required
            />
            <Input
              type="password"
              name="password"
              value={password}
              onChange={onChange}
              label="Password"
              size="lg"
              required
            />
            <div className="-ml-2.5">
              <Checkbox
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                label="Remember Me"
              />
            </div>
          </CardBody>
          <CardFooter className="pt-0">
            <Button type="submit" variant="gradient" fullWidth>
              Sign in
            </Button>
            <Typography variant="small" className="mt-6 flex justify-center">
              have an account?
              <Typography
                as="a"
                href="/login"
                variant="small"
                color="blue-gray"
                className="ml-1 font-bold"
              >
                login
              </Typography>
            </Typography>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}

export default SignCard;
