import { useRouter, useSearchParams } from "next/navigation";

export const useQueryParam = (key: string) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const value = searchParams.get(key) || "";

  const setValue = (newValue?: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (newValue) {
      params.set(key, newValue);
    } else {
      params.delete(key);
    }
    router.push(`?${params.toString()}`);
  };

  return { value, setValue };
};