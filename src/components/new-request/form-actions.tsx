"use client";

import { useRouter } from "next/navigation";

export default function FormActions(
  { router }: { router: ReturnType<typeof useRouter> }
) {

  return (
    <div className="flex justify-center gap-4 mt-8">
      <button
        type="submit"
        className="bg-green-700 hover:bg-green-800 text-white font-bold py-3 px-8 rounded transition-all"
      >
        Submit Communication Request
      </button>
      <button
        type="button"
        className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-3 px-8 rounded transition-all"
        onClick={() => router.push("/")}
      >
        Cancel
      </button>
    </div>
  );
}
