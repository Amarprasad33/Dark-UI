import DraggableCards from "@/registry/iris/draggable-cards";
import TubelightAccordion from "@/registry/iris/tubelight-accordion";
import VerticalNav from "@/registry/iris/vertical-nav";

export default function Playground() {
  return (
    <div className="min-h-screen h-screen bg-black flex justify-center items-center">
      <div className="relative w-[70%] h-[80%] border border-zinc-700 text-white border-dashed flex flex-col items-center justify-center">
        {/* <DraggableCards /> */}
        <CornerDecor />
        <VerticalNav />
        {/* <TubelightAccordion /> */}
        <div className="text-zinc-400 text-base absolute bottom-4 mx-auto sm:hidden">
          **Its still in development, please view on a bigger screen for better
          experience**
        </div>
      </div>
    </div>
  );
}

const CornerDecor = () => (
  <>
    <div className="corner-group absolute -top-[1px] -left-[1px] flex size-4 h-fit w-fit flex-col z-10">
      <span className="h-px w-1 translate-x-[1px] bg-[#262626] dark:bg-white" />
      <span className="h-1 w-px bg-[#262626] dark:bg-white" />
    </div>
    <div className="corner-group absolute -top-[1px] -right-1 flex size-4 h-fit w-fit flex-col z-10">
      <span className="h-px w-1 -translate-x-[4px] bg-[#262626] dark:bg-white" />
      <span className="h-1 w-px bg-[#262626] dark:bg-white" />
    </div>
    <div className="corner-group absolute -bottom-[1px] -left-[1px] flex size-4 h-fit w-fit flex-col z-10">
      <span className="h-1 w-px bg-[#262626] dark:bg-white" />
      <span className="h-px w-1 translate-x-[1px] bg-[#262626] dark:bg-white" />
    </div>
    <div className="corner-group absolute -right-1 -bottom-[1px] flex size-4 h-fit w-fit flex-col z-10">
      <span className="h-1 w-px bg-[#262626] dark:bg-white" />
      <span className="h-px w-1 -translate-x-[4px] bg-[#262626] dark:bg-white" />
    </div>
  </>
);
