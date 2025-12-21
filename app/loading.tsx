export default function RootLoading() {
  return (
    <div className="flex flex-col gap-4 relative w-full h-[800px] overflow-y-auto py-5 px-6">
      <section>
        <div className="w-full h-80 bg-blue-200 rounded-lg p-5 flex flex-col gap-2 justify-end items-end *:rounded-md *:animate-pulse *:bg-blue-100">
          <div className="w-40 h-7" />
          <div className="w-32 h-5" />
        </div>
      </section>
      <section className="flex flex-col gap-2">
        <div className="w-60 h-7 bg-blue-200 rounded-md" />
        <div className="flex justify-between gap-3 *:rounded-lg *:w-full *:h-52 *:bg-blue-200">
          <div className="flex justify-center items-center">
            <div className="w-40 h-7 bg-blue-100 rounded-md animate-pulse" />
          </div>
          <div className="flex justify-center items-center">
            <div className="w-40 h-7 bg-blue-100 rounded-md animate-pulse" />
          </div>
        </div>
      </section>
      <section className="flex flex-col gap-2">
        <div className="w-60 h-7 bg-blue-200 rounded-md" />
        <ul className="flex flex-col *:w-full gap-3 *:bg-blue-200 *:rounded-lg *:px-5 *:py-3">
          {Array.from({length: 5}, (_, i) => (
            <li key={i} className="flex justify-between items-center">
              <div className="flex flex-col gap-2 *:w-32 *:h-6 *:bg-blue-100 *:rounded-md *:animate-pulse">
                <div />
                <div />
              </div>
              <div className="w-32 h-7 rounded-lg bg-blue-100 animate-pulse" />
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
