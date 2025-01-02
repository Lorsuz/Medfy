import { ArrowLeftToLine, ArrowRightToLine } from "lucide-react";
import { useSidebar } from "../ui/sidebar";

export const HeaderNavTrigger = () => {
  const { setOpen, open, openMobile, setOpenMobile, isMobile } = useSidebar();

  return openMobile || open ? (
    <ArrowLeftToLine
      size={20}
      className={"cursor-pointer"}
      onClick={() => {
        if (isMobile) {
          setOpenMobile(!openMobile);
        } else setOpen(!open);
      }}
    />
  ) : (
    <ArrowRightToLine
      size={20}
      className={"cursor-pointer"}
      onClick={() => {
        if (isMobile) {
          setOpenMobile(!openMobile);
        } else setOpen(!open);
      }}
    />
  );
};
