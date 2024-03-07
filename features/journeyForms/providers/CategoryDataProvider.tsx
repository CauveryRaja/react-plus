import { PropsWithChildren, createContext } from "react";
import { SUPPORTED_CATEGORIES } from "../constants";

type CategoryProviderProps = {
  category?: CategoryId;
};

const CategoryDataContext = createContext({});

const CategoryDataProvider = ({
  category,
  children,
}: PropsWithChildren<CategoryProviderProps>) => {
  if (!category && !SUPPORTED_CATEGORIES.includes(category))
    return <div>Category {category} is not supported!</div>;
  return (
    <CategoryDataContext.Provider value={{}}>
      {children}
    </CategoryDataContext.Provider>
  );
};

export { CategoryDataContext, CategoryDataProvider };
