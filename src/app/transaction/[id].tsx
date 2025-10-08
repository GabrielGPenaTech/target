import { useState } from "react";
import { View } from "react-native";
import { useLocalSearchParams } from "expo-router";

import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { InputCurrency } from "@/components/InputCurrency";
import { PageHeader } from "@/components/PageHeader";
import { TransactionType } from "@/components/TransactionType";
import { TransactionTypes } from "@/utils/TransactionTypes";


export default function Transaction() {
  const [type, setType] = useState(TransactionTypes.Input)
  const param = useLocalSearchParams<{ id: string }>()

  return (
    <View style={{ flex: 1, padding: 24 }}>
      <PageHeader
        title="Nova transação"
        subtitle="A cada valor guardado você fica mais próximo de sua meta. Se esforce para guardar e evite retirar."
      />

      <View style={{ marginTop: 32, gap: 24 }}>
        <TransactionType selected={type} onChange={setType} />
        <InputCurrency value={0} label="Valor (R$)" />

        <Input label="Motivo (opcional)" placeholder="Ex: Investir em CDB de 100% no banco XPTO" />
        <Button title="Salvar" />
      </View>

    </View>
  )
}