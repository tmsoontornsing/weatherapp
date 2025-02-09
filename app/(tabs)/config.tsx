import { useState } from "react";
import { View, Text, TextInput, Button, Keyboard, TouchableWithoutFeedback } from "react-native";
import { useCity } from "../context/CityContext";

export default function ConfigScreen() {
  const { city, setCity } = useCity();
  const [input, setInput] = useState(city);

  const handleSave = () => {
    setCity(input);
    Keyboard.dismiss(); // Minimize the keyboard
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center", padding: 20 }}>
        <Text style={{ fontSize: 18, marginBottom: 10 }}>Enter City:</Text>
        <TextInput
          value={input}
          onChangeText={setInput}
          style={{
            width: "100%",
            padding: 10,
            borderWidth: 1,
            borderRadius: 5,
            marginBottom: 10,
          }}
          placeholder="Type city name..."
        />
        <Button title="Save" onPress={handleSave} />
      </View>
    </TouchableWithoutFeedback>
  );
}
