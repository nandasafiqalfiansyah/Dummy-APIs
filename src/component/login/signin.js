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

export function SignCard() {
  // State to store input values
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(!open);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!rememberMe) {
      setOpen(!open);
    }
    console.log("Email:", email);
    console.log("Password:", password);
    console.log("Remember Me:", rememberMe);
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
          <Button variant="text" color="red" className="mr-1">
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
            Sign in
          </Typography>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardBody className="flex flex-col gap-4">
            <Input
              label="Email"
              value={email}
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
