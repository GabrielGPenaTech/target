import { View } from "react-native";

import { HomeHeader } from "@/components/HomeHeader";
import { Target } from "@/components/Target";

const summary = {
  total: "R$ 2.680,00",
  input: "R$ 1.500,00",
  output: "R$ 150,00"
}

const targets = [
  {
    current: "R$ 500,00",
    name: "Comprar cadeira gamer",
    percentage: "50%",
    target: "R$ 1.000,00"
  }
]

export default function Index() {
  return (
    <View style={{ flex: 1 }}>
      <HomeHeader data={summary} />

      <Target data={targets[0]} />
    </View>
  )
}