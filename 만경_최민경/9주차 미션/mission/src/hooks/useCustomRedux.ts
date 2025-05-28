import { useDispatch as useDefaultDispatch, useSelector as useDefaultSelector } from "react-redux";
import { AppDispatch } from "../store/store";
import { RootState } from "@reduxjs/toolkit/query";
import type { TypedUseSelectorHook } from "react-redux";

export const useDispatch: ()=> AppDispatch = useDefaultDispatch;
export const useSelector: TypedUseSelectorHook<RootState>= useDefaultSelector;