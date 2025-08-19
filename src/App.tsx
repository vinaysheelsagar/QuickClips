import { useState, useEffect } from "react";

const STORAGE_KEY = "QuickClips";

function App() {
  const [buttons, setButtons] = useState<string[]>([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
    setButtons(saved);
  }, []);

  const addButton = (text: string) => {
    if (!text.trim()) return;
    const updated = [...buttons, text];
    setButtons(updated);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const removeButton = (text: string) => {
    const updated = buttons.filter((t) => t !== text);
    setButtons(updated);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  };

  return (
    <div style={{ margin: "20px", fontFamily: "Arial" }}>
      <h2>Create Clipboard Button</h2>
      <input id="textInput" type="text" placeholder="Enter text" />
      <button
        onClick={() => {
          const input = document.getElementById("textInput") as HTMLInputElement;
          addButton(input.value);
          input.value = "";
        }}
      >
        Add Button
      </button>

      <div style={{ marginTop: "20px" }}>
        {buttons.map((text, i) => (
          <div key={i} style={{ marginBottom: "10px" }}>
            <button onClick={() => copyToClipboard(text)}>{text}</button>
            <button
              onClick={() => removeButton(text)}
              style={{ marginLeft: "8px" }}
            >
              ❌
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
