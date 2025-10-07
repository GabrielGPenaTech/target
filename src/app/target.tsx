import { PageHeader } from "@/components/PageHeader";
import { router } from "expo-router";
import { Button, Text, View } from "react-native";

export default function Target() {
  return (
    <View style={{ flex: 1, padding: 24 }}>
      <PageHeader
        title="Meta"
        subtitle="Meta a bater até o final do ano"
      />
      <Button title="Voltar" onPress={() => router.back()} />
    </View>
  )
}