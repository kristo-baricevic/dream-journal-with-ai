import { SignUp } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="mt-8">
      <div className="flex justify-center items-center align-middle">
        <SignUp path="/sign-up" />
      </div>
    </div>
    );
}