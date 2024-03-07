import { CategoryDataProvider } from "@/features/journeyForms/providers/CategoryDataProvider";
import Head from "next/head";
import { useRouter } from "next/router";

export default function Journey() {
  const router = useRouter();
  const category = Array.isArray(router.query.category)
    ? router.query.category[0]
    : router.query.category;
  return (
    <>
      <Head>
        <title>Form journey</title>
      </Head>
      <main>
        <CategoryDataProvider category={category}></CategoryDataProvider>
      </main>
    </>
  );
}
