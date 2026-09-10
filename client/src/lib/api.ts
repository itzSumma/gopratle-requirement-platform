import { ApiResponse, RequirementDocument, RequirementFormData } from '../types/requirement';

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

export const createRequirement = async (
  payload: RequirementFormData
): Promise<ApiResponse<RequirementDocument>> => {
  // BASE_URL এর মধ্যে /api অলরেডি আছে, তাই পাথে শুধু /requirements হবে
  const res = await fetch(`${BASE_URL}/requirements`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || 'Failed to submit requirement');
  }

  return data;
};