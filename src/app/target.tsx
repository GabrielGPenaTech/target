import { router, useLocalSearchParams } from "expo-router";
import { useState, useEffect } from "react";

import { InputCurrency } from "@/components/InputCurrency";
import { useTargetDatabase } from "@/database/useTargetDatabase";
import { PageHeader } from "@/components/PageHeader";
import { Button } from "@/components/Button";
import { Alert, View } from "react-native";
import { Input } from "@/components/Input";

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
      update()
      return
    }

    create()
  }

  async function update() {
    try {
      await targetDatabase.update({
        id: Number(params.id),
        name,
        amount
      })

      Alert.alert("Sucesso", "Meta atualizada com sucesso!", [
        {
          text: "Ok",
          onPress: () => router.back()
        }
      ])

    } catch (error) {
      Alert.alert("Erro", "Não foi possível atualizar a meta.")
      console.log(error)
    } finally {
      setIsProcessing(false)
    }
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

  async function fetchDetails(id: number) {
    try {
      const response = await targetDatabase.show(id)
      setName(response.name)
      setAmount(response.amount)

    } catch (error) {
      Alert.alert("Erro", "Não foi possível carregar os detalhes da meta.")
      console.log(error)
    }
  }

  useEffect(() => {
    if (params.id) {
      fetchDetails(Number(params.id))
    }
  }, [params.id])

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