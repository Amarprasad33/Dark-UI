import DraggableCards from "@/registry/iris/draggable-cards";
import TubelightAccordion from "@/registry/iris/tubelight-accordion";

export default function Playground() {
  return (
    <div className="min-h-screen h-screen bg-black flex justify-center items-center">
      <div className="relative w-[70%] h-[80%] border border-zinc-700 text-white border-dashed flex flex-col items-center justify-center">
        <DraggableCards />
        {/* <TubelightAccordion /> */}
        <div className="text-zinc-400 text-base absolute bottom-4 mx-auto sm:hidden">
          **Its still in development, please view on a bigger screen for better
          experience**
        </div>
      </div>
    </div>
  );
}
