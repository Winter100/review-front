"use client";

import { ChevronDown, ChevronUp, Sparkle } from "lucide-react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { categories, filterSort } from "@/lib/validators/filter";
import { Checkbox } from "./ui/checkbox";
import { Button } from "./ui/button";
import { useFilterSidebar } from "@/hooks/useFilterSidebar";

const FilterSidebar = () => {
  const { form, onSubmit, openSections, toggleSection, defaultSort } =
    useFilterSidebar();

  return (
    <div className="sticky top-20 rounded-3xl border-2 border-pink-100 bg-white p-6 shadow-lg">
      <h3 className="mb-6 flex items-center gap-2 text-xl font-bold text-gray-800">
        <span className="text-2xl">🔍</span>
        필터
      </h3>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div>
            <button
              onClick={() => toggleSection("sort")}
              className="mb-3 flex w-full cursor-pointer items-center justify-between text-left font-semibold text-gray-700"
            >
              <span className="flex items-center gap-2">
                <Sparkle className="h-4 w-4 text-pink-500" />
                정렬
              </span>

              {openSections.sort ? (
                <ChevronUp className="h-4 w-4" />
              ) : (
                <ChevronDown className="h-4 w-4" />
              )}
            </button>
            {openSections.sort && (
              <FormField
                control={form.control}
                name="sort"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={defaultSort}
                        className="flex flex-col"
                      >
                        {filterSort.map((sort) => (
                          <FormItem
                            key={sort.value}
                            className="flex items-center gap-3"
                          >
                            <FormControl>
                              <RadioGroupItem
                                className="rounded-full border border-pink-300 fill-pink-400"
                                value={sort.value}
                              />
                            </FormControl>
                            <FormLabel className="flex w-full cursor-pointer items-center gap-2 rounded-lg p-2 transition-colors hover:bg-pink-50">
                              {sort.label}
                            </FormLabel>
                          </FormItem>
                        ))}
                      </RadioGroup>
                    </FormControl>
                  </FormItem>
                )}
              />
            )}
          </div>
          <div>
            <button
              onClick={() => toggleSection("category")}
              className="mb-3 flex w-full cursor-pointer items-center justify-between text-left font-semibold text-gray-700"
            >
              <span className="flex items-center gap-2">
                <Sparkle className="h-4 w-4 text-pink-500" />
                카테고리
              </span>

              {openSections.category ? (
                <ChevronUp className="h-4 w-4" />
              ) : (
                <ChevronDown className="h-4 w-4" />
              )}
            </button>
            {openSections.category && (
              <FormField
                control={form.control}
                name="category"
                render={() => (
                  <div>
                    {categories.map((item) => (
                      <FormField
                        key={item.value}
                        control={form.control}
                        name="category"
                        render={({ field }) => {
                          return (
                            <FormItem
                              key={item.value}
                              className="flex flex-row items-center gap-2"
                            >
                              <FormControl>
                                <Checkbox
                                  className="h-4 w-4 rounded border-pink-300 text-pink-500 focus:ring-pink-500"
                                  checked={field.value?.includes(item.value)}
                                  onCheckedChange={(checked) => {
                                    return checked
                                      ? field.onChange([
                                          ...field.value,
                                          item.value,
                                        ])
                                      : field.onChange(
                                          field.value?.filter(
                                            (value) => value !== item.value,
                                          ),
                                        );
                                  }}
                                />
                              </FormControl>
                              <FormLabel className="flex w-full cursor-pointer items-center gap-2 rounded-lg p-2 transition-colors hover:bg-pink-50">
                                {item.label}
                              </FormLabel>
                            </FormItem>
                          );
                        }}
                      />
                    ))}
                  </div>
                )}
              />
            )}
          </div>
          <Button className="cursor-pointer" variant="secondary" type="submit">
            필터 적용하기
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default FilterSidebar;
