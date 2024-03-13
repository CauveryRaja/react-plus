import { PropsWithChildren, createContext } from "react";
import { SUPPORTED_CATEGORIES } from "../constants";
import { useQuery } from "@tanstack/react-query";

type CategoryProviderProps = {
  category?: string;
};

const CategoryDataContext = createContext({});

const CategoryDataProvider = ({
  category,
  children,
}: PropsWithChildren<CategoryProviderProps>) => {
  const isCategorySupported = !!(
    category && SUPPORTED_CATEGORIES.includes(category as CategoryId)
  );

  const categoryQuery = useQuery({
    queryKey: ["category"],
    queryFn: () => fetch(`/category?id=${category}`).then((res) => res.json()),
    enabled: isCategorySupported,
  });
  const { data, status, error } = categoryQuery;

  if (!isCategorySupported)
    return <div>Category {category} is not supported!</div>;

  if (error) return <div>Cannot fetch category details</div>;

  return status === "success" ? (
    <CategoryDataContext.Provider value={{}}>
      {children}
    </CategoryDataContext.Provider>
  ) : (
    <div>Loading...</div>
  );
};

export { CategoryDataContext, CategoryDataProvider };
