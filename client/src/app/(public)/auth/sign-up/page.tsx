import { CardFormSignUp } from "../components/card-form-sign-up";
import { SideCard } from "../components/side-card";

export default function SignUp() {
  return (
    <div className="grid lg:grid-cols-[auto_1fr] min-h-screen bg-background">
      <SideCard />

      <div className="flex flex-col items-center justify-center">
        <CardFormSignUp />
      </div>
    </div>
  );
}
