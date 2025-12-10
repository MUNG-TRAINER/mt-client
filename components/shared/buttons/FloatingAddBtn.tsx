import {PlusIcon} from "@/components/icons/add";

export default function FloatingAddBtn() {
  return (
    <button className="fixed bottom-24 right-5 bg-blue-500 p-5 rounded-full">
      <i>
        <PlusIcon className="size-6 text-white" />
      </i>
    </button>
  );
}
