import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

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

export function LoginCard() {
  const Navigate = useNavigate();
  const [username, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(!open);
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!rememberMe) {
      setOpen(true);
    } else {
      try {
        await loginUser(username, password);
        console.log("login sucses");
        Navigate("/dashboard");
      } catch (error) {
        alert("Failed to login", error);
        Navigate("/");
      }
    }
  };

  // Fungsi untuk mengirimkan permintaan login ke API
  const loginUser = async (username, password) => {
    const response = await fetch(
      "https://dummy-api-umber.vercel.app/auth/login",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      }
    );
    if (!response.ok) {
      throw new Error("Failed to login");
    }
    const data = await response.json();
    return data;
  };
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchLoginStatus = async () => {
      try {
        const response = await fetch(
          "https://dummy-api-umber.vercel.app/auth/status"
        );
        if (response.ok) {
          const data = await response.json();
          setIsLoggedIn(data.isLoggedIn);
        } else {
          setIsLoggedIn(false);
        }
      } catch (error) {
        console.error("Error fetching login status:", error);
        setIsLoggedIn(false);
      } finally {
        setIsLoading(false);
      }
    };

    fetchLoginStatus();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isLoggedIn) {
    return Navigate("/dashboard");
  }

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
        <form onSubmit={handleSubmit}>
          <CardBody className="flex flex-col gap-4">
            <Input
              label="Email"
              value={username}
              onChange={(e) => setEmail(e.target.value)}
              size="lg"
              required
            />
            <Input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              label="Password"
              size="lg"
              required
            />
            <div className="-ml-2.5">
              <Checkbox
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                label="agree terms this website"
              />
            </div>
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
  );
}

export default LoginCard;
