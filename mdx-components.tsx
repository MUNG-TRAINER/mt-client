import {MDXComponents} from "mdx/types";

const components: MDXComponents = {
  h1: ({children}) => <h1 className="font-bold text-center">{children}</h1>,
  h2: ({children}) => <h2 className="font-bold ">{children}</h2>,
  h3: ({children}) => <h3 className="font-bold ">{children}</h3>,
  h4: ({children}) => <h4 className="font-bold ">{children}</h4>,
  h5: ({children}) => <h5 className="font-bold ">{children}</h5>,
  h6: ({children}) => <h6 className="font-bold ">{children}</h6>,
  p: ({children}) => <p className="text-wrap break-all">{children}</p>,
  ol: ({children}) => (
    <ol className="flex flex-col gap-2 break-all">{children}</ol>
  ),
  ul: ({children}) => (
    <ul className="flex flex-col gap-2 break-all">{children}</ul>
  ),
  li: ({children}) => <li className="text-wrap break-all">{children}</li>,
  hr: () => <hr className="" />,
};

export function useMDXComponents(): MDXComponents {
  return components;
}
