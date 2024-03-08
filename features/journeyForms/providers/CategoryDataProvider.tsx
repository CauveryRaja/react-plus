import { PropsWithChildren, createContext } from "react";
import { SUPPORTED_CATEGORIES } from "../constants";

type CategoryProviderProps = {
  category?: string;
};

const CategoryDataContext = createContext({});

const CategoryDataProvider = ({
  category,
  children,
}: PropsWithChildren<CategoryProviderProps>) => {
  if (!(category && SUPPORTED_CATEGORIES.includes(category as CategoryId)))
    return <div>Category {category} is not supported!</div>;

  return (
    <CategoryDataContext.Provider value={{}}>
      {children}
    </CategoryDataContext.Provider>
  );
};

export { CategoryDataContext, CategoryDataProvider };
