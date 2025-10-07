import { View } from "react-native";

import { HomeHeader } from "@/components/HomeHeader";

const summary = {
  total: "R$ 2.680,00",
  input: "R$ 1.500,00",
  output: "R$ 150,00"
}

export default function Index() {
  return (
    <View style={{ flex: 1 }}>
      <HomeHeader data={summary} />
    </View>
  )
}