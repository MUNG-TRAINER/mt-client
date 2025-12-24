export interface WishlistType {
  userId: number;
  wishlistItemId: number;
  wishlistId: number;
  courseId: number;
  price: number;
  status: string;
  dogId: number;
  dogName: string;
  title: string;
  type: string;
  lessonForm: string;
  tags: string;
  mainImage: string;
  description: string;
  schedule: string;
  location: string;
}

export interface WishlistDogType {
  dogId: number;
  name: string;
  breed: string;
  hasCounseling: boolean;
}