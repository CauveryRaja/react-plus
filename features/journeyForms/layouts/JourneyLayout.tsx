import { useRouter } from "next/router";
import { CategoryDataProvider } from "../providers/CategoryDataProvider";

export const JourneyLayout = () => {
  const router = useRouter();
  const category = Array.isArray(router.query.category)
    ? router.query.category[0]
    : router.query.category;

  return (
    <main>
      <CategoryDataProvider categoryId={category}></CategoryDataProvider>
    </main>
  );
};
