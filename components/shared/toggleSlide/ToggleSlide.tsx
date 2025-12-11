interface IToggleSlideProps {
  toggleState: boolean;
  toggleFn: () => void;
}
export default function ToggleSlide({
  toggleState,
  toggleFn,
}: IToggleSlideProps) {
  return (
    <div className={`flex items-center w-full h-3 bg-blue-500 rounded-3xl`}>
      <button
        onClick={toggleFn}
        className={`size-10 rounded-full bg-green-500`}
      ></button>
    </div>
  );
}
