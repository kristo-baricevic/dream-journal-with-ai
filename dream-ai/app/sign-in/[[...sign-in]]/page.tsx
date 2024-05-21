import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
  <div className="mt-10 flex align-middle justify-center">
    <SignIn path="/sign-in" />
  </div>
  );
}