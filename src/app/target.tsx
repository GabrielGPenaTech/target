import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { InputCurrency } from "@/components/InputCurrency";
import { PageHeader } from "@/components/PageHeader";
import { router } from "expo-router";
import { View } from "react-native";

export default function Target() {
  return (
    <View style={{ flex: 1, padding: 24 }}>
      <PageHeader
        title="Meta"
        subtitle="Meta a bater até o final do ano"
      />

      <View style={{ marginTop: 32, gap: 24 }}>
        <Input label="Nome da meta" placeholder="Ex: Viagem para praia, Apple Watch" />
        <InputCurrency label="Valor alvo" value={0} />
        <Button title="Salvar" />
      </View>

    </View>
  )
}