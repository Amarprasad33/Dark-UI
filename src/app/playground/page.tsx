import FlashlightTabs from "@/registry/iris/flashlight-tabs";
import GooeyMenu from "@/registry/iris/gooey-menu";
import MultiFollowCursor from "@/registry/iris/multi-follow-cursor";

export default function Playground() {
  return (
    <div className="min-h-screen h-screen bg-black flex justify-center items-center">
      <div className="relative w-[70%] h-[80%] border border-zinc-700 text-white border-dashed flex flex-col items-center justify-center">
        <FlashlightTabs />
        <div className="text-zinc-400 text-base absolute bottom-4 mx-auto sm:hidden">
          **Its still in development, please view on a bigger screen for better
          experience**
        </div>
      </div>
    </div>
  );
}
