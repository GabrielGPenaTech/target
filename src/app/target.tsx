import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { InputCurrency } from "@/components/InputCurrency";
import { PageHeader } from "@/components/PageHeader";
import { useTargetDatabase } from "@/database/useTargetDatabase";
import { router, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { Alert, View } from "react-native";

export default function Target() {
  const [isProcessing, setIsProcessing] = useState(false)
  const [name, setName] = useState("")
  const [amount, setAmount] = useState(0)

  const targetDatabase = useTargetDatabase()

  const params = useLocalSearchParams<{ id?: string }>()

  function handleSave() {
    if (!name.trim() || amount <= 0) {
      return Alert.alert("Atenção", "Preencha nome e o valor precisa ser maior que zero")
    }

    setIsProcessing(true)

    if (params.id) {
      //update

      return
    }

    create()
  }

  async function create() {
    try {
      await targetDatabase.create({ name, amount })

      Alert.alert("Nova Meta", "Meta criada com sucesso!", [
        {
          text: "Ok",
          onPress: () => router.back()
        }
      ])
    } catch (error) {
      Alert.alert("Erro", "Não foi possível criar a meta")
      console.log(error)
    } finally {
      setIsProcessing(false)
    }
  }


  return (
    <View style={{ flex: 1, padding: 24 }}>
      <PageHeader
        title="Meta"
        subtitle="Meta a bater até o final do ano"
      />

      <View style={{ marginTop: 32, gap: 24 }}>
        <Input
          label="Nome da meta"
          placeholder="Ex: Viagem para praia, Apple Watch"
          onChangeText={setName}
          value={name}
        />
        <InputCurrency label="Valor alvo (R$)" value={amount} onChangeValue={setAmount} />
        <Button title="Salvar" onPress={handleSave} isProcessing={isProcessing} />
      </View>

    </View>
  )
}