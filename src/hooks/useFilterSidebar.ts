import { FilterSchema, FilterType } from "@/lib/validators/filter";
import { zodResolver } from "@hookform/resolvers/zod";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

export const useFilterSidebar = () => {
  const router = useRouter();
  const pathName = usePathname();
  const searchParmas = useSearchParams();

  const [openSections, setOpenSections] = useState({
    sort: true,
    category: true,
    rating: false,
    time: false,
  });

  const sortParam = searchParmas.get("sort");
  const parsedSort = FilterSchema.shape.sort.safeParse(sortParam);
  const defaultSort = parsedSort.data;

  const form = useForm<FilterType>({
    resolver: zodResolver(FilterSchema),
    defaultValues: {
      sort: defaultSort,
      category: ["all"],
    },
  });

  const watchedCategory = form.watch("category");

  useEffect(() => {
    if (watchedCategory?.length === 0) {
      form.setValue("category", ["all"]);
    }
  }, [watchedCategory, form]);

  const onSubmit: SubmitHandler<FilterType> = (data) => {
    const params = new URLSearchParams();

    params.append("sort", data.sort);

    for (const [key, values] of Object.entries(data)) {
      if (key === "sort") {
        continue;
      } else {
        for (const value of values) {
          params.append(key, value);
        }
      }
    }

    router.replace(`${pathName}/?${params.toString()}`);
  };

  const toggleSection = (section: keyof typeof openSections) => {
    setOpenSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  return { form, toggleSection, onSubmit, openSections, defaultSort };
};
