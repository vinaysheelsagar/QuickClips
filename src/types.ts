export type Clip = { id: string; text: string; createdAt: number; updatedAt?: number };
export const STORAGE_KEY = "QuickClips";
export const newId = () => Math.random().toString(36).slice(2) + Date.now().toString(36);
