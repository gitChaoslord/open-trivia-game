import { createAsyncThunk } from "@reduxjs/toolkit";
import { AppDispatch, RootState } from ".";

export type CustomThunkConfig = {
  state: RootState
  dispatch: AppDispatch
  // extra?: unknown
  // rejectWithValue: GenericApiError
  // rejectValue: GenericApiError
  // serializedErrorType?: unknown
  // pendingMeta?: unknown
  // fulfilledMeta?: unknown
  // rejectedMeta?: unknown
}

export const createAppAsyncThunk = createAsyncThunk.withTypes<CustomThunkConfig>()
