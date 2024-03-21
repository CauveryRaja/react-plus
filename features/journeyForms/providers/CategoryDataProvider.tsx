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
    queryFn: () =>
      fetch(`http://localhost:5000/category?id=${category}`)
        .then((res) => res.json())
        .then((data) => data[0]),
    enabled: isCategorySupported,
  });
  const { data, status, error } = categoryQuery;

  console.log("category data", data);

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
