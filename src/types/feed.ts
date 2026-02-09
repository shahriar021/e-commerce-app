export interface FeedCategoryResponse {
    data: string[];
    message: string;
    success: boolean;
}

export interface Post {
    _id: string; attachment: string[]; brandId: string; brandName: string; caption: string; createdAt: string;
    firstName: string; lastName: string; userName: string; uploaderId: string; uploaderType: string; profile: any[];
    tags: string[]; isReacted: boolean; isSavePost: boolean; totalComments: number; totalReacts: number;brandLogo: string[];
}

export interface Comment {
    commentorId: string;
    comments: string;
    createdAt: string;
    id: string;
    isDeleted: boolean;
    postId: string;
    role: string;
    updatedAt: string;
}

export interface GetCommentsResponse {
  comments: Comment[]; // Array of Comment objects
  meta: {
    limit: number;
    page: number;
    total: number;
    totalPage: number;
  };
}

export interface APIResponse {
  data: GetCommentsResponse;  // Contains comments and meta
  message: string;
  success: boolean;
}

 export interface QueryResult {
  data?: GetCommentsResponse;
  error?: any;  // Or type it more specifically depending on your query error structure
  isLoading: boolean;
  isSuccess: boolean;
  isError: boolean;
}

export interface SelectedBrand {
  _id: string;
  brandLogo: string[];
  brandName: string;
  theme: string;
}
