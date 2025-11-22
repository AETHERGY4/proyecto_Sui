import { useState } from "react"

function InstitutionForm({ ClientCall, estado, setInstitucionCreada }) {
    const funcion = "crear_empresa"
    const [nombre, cambiarNombre] = useState("")

    function enviar() {
        ClientCall({
            funcion,
            args: [nombre]
        })
    }
    
    return(
        <form style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "15px",
          marginTop: "30px"
        }}>
          
          <input 
            type="text" 
            placeholder="¿Cuál sería el nombre de tu institución educativa?"
            style={{
              padding: "12px 20px",
              fontSize: "16px",
              borderRadius: "8px",
              border: "1px solid #ccc",
              width: "100%",
              maxWidth: "400px",
              textAlign: "center"
            }}
            onChange={(e) => cambiarNombre(e.target.value)} 
          />

          <button 
            className='purple-button' 
            type="button"
            disabled={estado}
            style={{ width: "100%", maxWidth: "300px" }}
            onClick={() => enviar()}
          >
            🎓 Crear Institución
          </button>

          <p style={{ fontSize: "14px", color: "#ccc", marginTop: "10px" }}>
            ¿Ya tienes una institución registrada?{' '}
            <span 
              style={{ color: "#8e44ad", cursor: "pointer", textDecoration: "underline", fontWeight: "bold" }}
              onClick={() => setInstitucionCreada(true)}
            >
              Acceder al panel
            </span>
          </p>

        </form>
    )
}

export default InstitutionForm