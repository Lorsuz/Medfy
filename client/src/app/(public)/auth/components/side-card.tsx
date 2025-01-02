import Image from "next/image";
import {
  RiInstagramLine,
  RiTwitterLine,
} from "react-icons/ri";

export function SideCard() {
  return (
    <div className="max-lg:hidden flex flex-col p-[12%] items-start justify-between gap-4 bg-primary w-[400px] text-primary-foreground">
      <div>
        <div className="mb-10">
          <Image
            src="/images/medfy_logo.svg"
            width={45}
            height={45}
            alt="Medfy Academy"
          />
        </div>

        <div className="flex flex-col gap-4">
          <h1 className="text-[38px] font-bold tracking-tighter leading-9">
            <span className="text-primary bg-secondary-foreground px-1">
              Medfy
            </span>
            , a plataforma de estudos online.
          </h1>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <h1 className="text-base font-medium tracking-tight">
          Acesse nossas redes:
        </h1>
        <div className="flex items-center gap-2">
          <RiInstagramLine size={25} />
          <RiTwitterLine size={25} />
        </div>
      </div>
    </div>
  );
}
