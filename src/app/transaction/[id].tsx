import { useState } from "react";
import { Alert, View } from "react-native";
import { router, useLocalSearchParams } from "expo-router";

import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { InputCurrency } from "@/components/InputCurrency";
import { PageHeader } from "@/components/PageHeader";
import { TransactionType } from "@/components/TransactionType";
import { TransactionTypes } from "@/utils/TransactionTypes";
import { useTransactionsDatabase } from "@/database/useTransactionsDatabase";


export default function Transaction() {
  const [amount, setAmount] = useState<number>(0)
  const [type, setType] = useState(TransactionTypes.Input)
  const [isCreating, setIsCreating] = useState(false)
  const [observation, setObservation] = useState("")

  const param = useLocalSearchParams<{ id: string }>()
  const transactionDatabase = useTransactionsDatabase()

  async function handleCreate() {
    try {
      if (amount <= 0) {
        return Alert.alert("Atenção!", "Preencha o valor. A transação de ser maior que zero.")
      }

      setIsCreating(true)

      await transactionDatabase.create({
        target_id: Number(param.id),
        amount: type === TransactionTypes.Output ? amount * -1 : amount,
        observation
      })

      Alert.alert("Sucesso", "Transação salva com sucesso!", [
        { text: "Ok", onPress: () => router.back() }
      ])

    } catch (error) {
      Alert.alert("Erro", "Não foi possível salvar a transação.")
      console.log(error)
    } finally {
      setIsCreating(false)
    }
  }

  return (
    <View style={{ flex: 1, padding: 24 }}>
      <PageHeader
        title="Nova transação"
        subtitle="A cada valor guardado você fica mais próximo de sua meta. Se esforce para guardar e evite retirar."
      />

      <View style={{ marginTop: 32, gap: 24 }}>
        <TransactionType selected={type} onChange={setType} />
        <InputCurrency value={amount} label="Valor (R$)" onChangeValue={setAmount} />

        <Input
          label="Motivo (opcional)"
          placeholder="Ex: Investir em CDB de 100% no banco XPTO"
          value={observation}
          onChangeText={setObservation}
        />
        <Button title="Salvar" onPress={handleCreate} isProcessing={isCreating} />
      </View>

    </View>
  )
}