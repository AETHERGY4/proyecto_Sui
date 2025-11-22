import { useState } from 'react';
import { FUNCTIONS } from './functionsConfig';

export function CertificateDashboard({ ClientCall, estado, objectId, setObjectId, respuesta }) {

    return (
        <div style={{ padding: "20px", maxWidth: "1200px", margin: "0 auto", marginTop: "50px" }}>
            
            {/* HEADER: Input para ID de Institución */}
            <div style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "15px",
                marginBottom: "40px",
                padding: "20px",
                background: "#f9f9f9",
                borderRadius: "12px"
            }}>
                <h2 style={{ color: "#333", margin: "0" }}>🎓 Panel de Gestión Académica</h2>
                <input 
                    type="text" 
                    placeholder="Pega aquí el ID de la Institución a gestionar (0x...)"
                    value={objectId}
                    onChange={(e) => setObjectId(e.target.value)}
                    style={{
                        padding: "12px 20px",
                        fontSize: "16px",
                        borderRadius: "8px",
                        border: "1px solid #ccc",
                        width: "100%",
                        maxWidth: "500px",
                        textAlign: "center",
                        fontFamily: "monospace"
                    }}
                />
            </div>
            
            {respuesta !== null && (
                <div style={{
                    padding: "15px",
                    background: "#ffffffff",
                    borderRadius: "10px",
                    marginBottom: "25px",
                    textAlign: "center",
                    border: "1px solid #d6b8ff"
                }}>
                    <strong style={{color:'black'}}>📊 Resultado Académico:</strong>
                    <pre style={{
                    whiteSpace: "pre-wrap",
                    marginTop: "10px",
                    color: "#4a148c",
                    fontFamily: "monospace"
                    }}>
                    {JSON.stringify(respuesta, null, 2)}
                    </pre>
                </div>
            )}

            {/* GRID DE FUNCIONES ACADÉMICAS */}
            <div style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))",
                gap: "25px"
            }}>
                {FUNCTIONS.map((config, index) => (
                    <AcademicFunctionCard 
                        key={index}
                        config={config}
                        ClientCall={ClientCall}
                        estado={estado}
                        objectId={objectId}
                    />
                ))}
            </div>
        </div>
    );
}

// COMPONENTE: Tarjeta de Función Académica
function AcademicFunctionCard({ config, ClientCall, estado, objectId }) {
    const [valores, setValores] = useState({});

    function enviar(e) {
        e.preventDefault();
        if (!objectId) {
            alert("Primero debes ingresar el ID de la institución arriba.");
            return;
        }

        const argsOrdenados = [objectId, ...config.inputs.map(input => {
            const valorRaw = valores[input.name];
            if (['u8', 'u16', 'u32', 'u64'].includes(input.type)) {
                return { type: input.type, value: Number(valorRaw) };
            }
            return valorRaw;
        })];

        ClientCall({
            funcion: config.nombreFuncion,
            args: argsOrdenados,
            soloLectura: config.soloLectura
        });
    }

    const handleChange = (name, value) => {
        setValores(prev => ({ ...prev, [name]: value }));
    };

    return (
        <div style={{
            border: "1px solid #eee",
            borderRadius: "12px",
            padding: "25px",
            background: "#fff",
            boxShadow: "0 4px 12px rgba(0,0,0,0.05)"
        }}>
            <h3 style={{ color: "#8e44ad", marginTop: 0 }}>📝 {config.titulo}</h3>
            <p style={{ fontSize: "14px", color: "#666", lineHeight: "1.5", marginBottom: "20px" }}>
                {config.descripcion}
            </p>

            <form style={{
                display: "flex",
                flexDirection: "column",
                gap: "15px"
            }}>
                {config.inputs.map((input, idx) => (
                    <div key={idx}>
                        <label style={{ display: "block", fontSize: "14px", fontWeight: "bold", marginBottom: "5px", color: "#444" }}>
                            {input.label}
                        </label>
                        <input 
                            type={input.type.includes('u') ? "number" : "text"}
                            placeholder={`Ingresa ${input.label}`}
                            onChange={(e) => handleChange(input.name, e.target.value)}
                            style={{
                                padding: "10px 15px",
                                fontSize: "15px",
                                borderRadius: "8px",
                                border: "1px solid #ccc",
                                width: "100%",
                                boxSizing: "border-box"
                            }}
                        />
                    </div>
                ))}

                <button 
                    className='purple-button'
                    type="button"
                    disabled={estado}
                    onClick={(e) => enviar(e)}
                    style={{ width: "100%", marginTop: "10px" }}
                >
                   🎓 Ejecutar {config.nombreFuncion}
                </button>
            </form>
        </div>
    );
}