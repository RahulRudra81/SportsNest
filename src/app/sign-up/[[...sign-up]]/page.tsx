import { SignUp } from "@clerk/nextjs";

export default function Page() {
  return <>
    <div className="flex items-center justify-center mt-10 h-full">
    <SignUp path="/sign-up" />
    </div>
  
  </>
}