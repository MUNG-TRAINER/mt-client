"use server";

export async function editCoureAction(state: any, formData: FormData) {
  console.log(formData.get("detailImage"));
  const data = {
    title: formData.get("title"),
    location: formData.get("location"),
    schedule: formData.get("schedule"),
    isFree: formData.get("isFree"),
    mainImage: formData.get("mainImage"),
    mainImageKey: formData.get("mainImageKey"),
    lessonForm: formData.get("lessonForm"),
    difficulty: formData.get("difficulty"),
    detailImageKey: formData.get("detailImageKey"),
    dogSize: formData.get("dogSize"),
    description: formData.get("description"),
  };
}
