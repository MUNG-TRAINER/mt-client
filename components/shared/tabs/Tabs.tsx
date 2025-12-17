interface TabsProps<T extends string> {
  activeTab: T;
  setActiveTab: (tab: T) => void;
  tabLabels: Record<T, string>;
}

const Tabs = <T extends string>({
  activeTab,
  setActiveTab,
  tabLabels,
}: TabsProps<T>) => {
  return (
    <div className="flex border-b border-(--mt-gray-point) sticky top-0 bg-(--mt-white) z-10">
      {Object.entries(tabLabels).map(([key, label]) => {
        const tabKey = key as T;
        return (
          <button
            key={tabKey}
            onClick={() => setActiveTab(tabKey)}
            className={`w-1/2 py-2 font-semibold ${
              activeTab === tabKey
                ? "border-b-2 border-(--mt-blue-point) text-(--mt-blue-point)"
                : "text-(--mt-gray-point)"
            }`}
          >
            {label as string}
          </button>
        );
      })}
    </div>
  );
};
export default Tabs;
