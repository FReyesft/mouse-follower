import "./App.css";
import { useEffect, useState } from "react";
function App() {
  const [enabled, setEnabled] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });


  //pointer move
  useEffect(() => {
    //No se Puede meter dentro de  un condicional un hook, ¡NUNCA!
    console.log("efecto", { enabled });
    const handleMove = (event) => {
      const { clientX, clientY } = event;
      console.log({ clientX, clientY });
      setPosition({ x: clientX, y: clientY });
    };
    if (enabled) {
      window.addEventListener("pointermove", handleMove);
    }
    //useEffectCleaner se hace cada vez que cambia la dependencia
    //Cuando el componente se demonta
    return () => {
      window.removeEventListener("pointermove", handleMove);
    };
  }, [enabled]); // Para que se ejecute cada vez que cambie el valor de enabled

  useEffect(() => {
    document.body.classList.toggle('no-cursor', enabled)
    return () => {
      document.body.classList.remove('no-cursor')
    }
  }, [enabled])

  return (
    <main>
      <div
        style={{
          position: "absolute",
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          border: "1px solid #fff",
          borderRadius: "50%",
          opacity: 0.8,
          pointerEvents: "none",
          left: -25,
          top: -25,
          width: 50,
          height: 50,
          transform: `translate(${position.x}px, ${position.y}px)`,
        }}
      ></div>
      <h3>Mouse Follower</h3>
      <button onClick={() => setEnabled(!enabled)}>
        {enabled ? "Desactivar" : "Activar"}
      </button>
    </main>
  );
}

export default App;
