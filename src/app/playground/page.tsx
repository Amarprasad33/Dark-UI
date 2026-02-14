import MultiFollowCursor from "@/registry/iris/multi-follow-cursor";

export default function Playground() {
  return (
    <div className="min-h-screen h-screen bg-black flex justify-center items-center">
      <div className="relative w-[70%] h-[80%] border border-zinc-700 text-white border-dashed flex flex-col items-center justify-center">
        <MultiFollowCursor />
      </div>
    </div>
  );
}
