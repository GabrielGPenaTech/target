import { ActivityIndicator } from "react-native"

import { style } from "./stlyes"
import { colors } from "@/theme"

export function Loading() {
  return <ActivityIndicator color={colors.blue[500]} style={style.container} />
}