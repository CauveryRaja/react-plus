import { PropsWithChildren, createContext, useContext } from "react";
import { SUPPORTED_CATEGORIES } from "../constants";
import { useQuery } from "@tanstack/react-query";

type CategoryProviderProps = {
  categoryId?: string;
};

type Category = {
  id: string;
  name: string;
  description: string;
};

type CategoryContext = {
  category: Category;
};
const CategoryDataContext = createContext<CategoryContext>({
  category: { id: "", name: "", description: "" },
});

const CategoryDataProvider = ({
  categoryId,
  children,
}: PropsWithChildren<CategoryProviderProps>) => {
  const isCategorySupported = !!(
    categoryId && SUPPORTED_CATEGORIES.includes(categoryId as CategoryId)
  );

  const categoryQuery = useQuery({
    queryKey: ["category"],
    queryFn: () =>
      fetch(`http://localhost:5000/category?id=${categoryId}`)
        .then((res) => res.json())
        .then((data) => data[0]),
    enabled: isCategorySupported,
  });
  const { data, status, error } = categoryQuery;

  if (!isCategorySupported)
    return <div>Category {categoryId} is not supported!</div>;

  if (error) return <div>Cannot fetch category details</div>;

  return status === "success" ? (
    <CategoryDataContext.Provider value={{ category: data }}>
      {children}
    </CategoryDataContext.Provider>
  ) : (
    <div>Loading...</div>
  );
};

const useCategoryData = () => useContext<CategoryContext>(CategoryDataContext);

export { CategoryDataProvider, useCategoryData };
