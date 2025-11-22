import { useState } from "react"

function InstitutionForm({ ClientCall, estado, setInstitucionCreada }) {
    const funcion = "crear_empresa"
    const [nombre, cambiarNombre] = useState("")

    function enviar() {
        if (!nombre.trim()) {
            alert("Por favor ingresa el nombre de la institución");
            return;
        }
        ClientCall({
            funcion,
            args: [nombre]
        })
    }
    
    return(
        <div className="hero-section">
            <h1 className="hero-title">Crear Nueva Institución</h1>
            <p className="hero-subtitle">
                Registra tu institución educativa en blockchain para comenzar a emitir certificados digitales verificables.
            </p>
            
            <div style={{maxWidth: '500px', margin: '0 auto'}}>
                <div className="form-group">
                    <label className="form-label">Nombre de la Institución</label>
                    <input 
                        type="text" 
                        placeholder="Ej: Universidad Tecnológica Global"
                        className="form-input"
                        value={nombre}
                        onChange={(e) => cambiarNombre(e.target.value)}
                    />
                </div>

                <button 
                    className="btn-primary"
                    type="button"
                    disabled={estado}
                    onClick={enviar}
                    style={{marginBottom: '1rem'}}
                >
                    {estado ? (
                        <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem'}}>
                            <div className="loading-spinner"></div>
                            Creando...
                        </div>
                    ) : (
                        "🎓 Crear Institución"
                    )}
                </button>

                <p style={{textAlign: 'center', color: '#cbd5e1', fontSize: '0.9rem'}}>
                    ¿Ya tienes una institución registrada?{' '}
                    <span 
                        style={{ color: "#fbbf24", cursor: "pointer", textDecoration: "underline", fontWeight: "600" }}
                        onClick={() => setInstitucionCreada(true)}
                    >
                        Acceder al panel existente
                    </span>
                </p>
            </div>
        </div>
    )
}

export default InstitutionForm