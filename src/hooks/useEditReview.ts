import { ReviewSchema, ReviewType } from "@/lib/validators/review";
import { createReviewApi } from "@/service/api/review";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

export const useEditReview = () => {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [tagInput, setTagInput] = useState("");
  const [images, setImages] = useState<File[]>([]);

  const router = useRouter();

  const { isPending, mutate } = useMutation({
    mutationFn: createReviewApi,
    onSuccess: () => {
      router.back();
    },
    onError: () => {},
  });

  const form = useForm<ReviewType>({
    resolver: zodResolver(ReviewSchema),
    defaultValues: {
      title: "",
      category: "",
      rating: 0,
      content: "",
      tags: [],
      location: "",
      price: "",
    },
  });

  const watchedTags = form.watch("tags");

  const onSubmit: SubmitHandler<ReviewType> = async (data) => {
    mutate({ ...data, images });
  };

  const handleRatingClick = (value: number) => {
    setRating(value);
    form.setValue("rating", value);
  };

  const addTag = () => {
    if (
      tagInput.trim() &&
      watchedTags.length < 5 &&
      !watchedTags.includes(tagInput.trim())
    ) {
      form.setValue("tags", [...watchedTags, tagInput.trim()]);
      setTagInput("");
    }
  };

  const removeTag = (tagToRemove: string) => {
    form.setValue(
      "tags",
      watchedTags.filter((tag) => tag !== tagToRemove),
    );
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (images.length + files.length <= 5) {
      setImages([...images, ...files]);
    }
  };

  const removeImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index));
  };

  return {
    isPending,
    form,
    rating,
    hoverRating,
    tagInput,
    setTagInput,
    handleImageUpload,
    removeImage,
    setHoverRating,
    onSubmit,
    handleRatingClick,
    addTag,
    removeTag,
    watchedTags,
    images,
  };
};
