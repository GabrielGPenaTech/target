import { Text, View } from "react-native";
import { style } from "./styles";
import { LinearGradient } from "expo-linear-gradient"
import { colors } from "@/theme";

export function HomeHeader() {
  return (
    <LinearGradient colors={[colors.blue[500], colors.blue[800]]} style={style.container}>
      <View>
        <Text style={style.label}>Total que você possui</Text>
      </View>
    </LinearGradient>
  )
}