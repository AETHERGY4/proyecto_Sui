import React, { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [tasks, setTasks] = useState([])
  const [taskInput, setTaskInput] = useState('')
  const [timer, setTimer] = useState(25 * 60)
  const [isRunning, setIsRunning] = useState(false)
  const [focusMode, setFocusMode] = useState(false)

  // Cargar tareas del localStorage
  useEffect(() => {
    const savedTasks = localStorage.getItem('focusflow-tasks')
    if (savedTasks) {
      setTasks(JSON.parse(savedTasks))
    }
  }, [])

  // Timer effect
  useEffect(() => {
    let interval
    if (isRunning && timer > 0) {
      interval = setInterval(() => {
        setTimer(timer => timer - 1)
      }, 1000)
    } else if (timer === 0) {
      setIsRunning(false)
      // Notificación de tiempo completado
      if (Notification.permission === 'granted') {
        new Notification('¡Tiempo completado!', {
          body: 'Tu sesión de enfoque ha terminado. Toma un descanso.',
        })
      }
    }
    return () => clearInterval(interval)
  }, [isRunning, timer])

  const addTask = () => {
    if (taskInput.trim()) {
      const newTasks = [...tasks, { text: taskInput, completed: false, id: Date.now() }]
      setTasks(newTasks)
      localStorage.setItem('focusflow-tasks', JSON.stringify(newTasks))
      setTaskInput('')
    }
  }

  const toggleTask = (id) => {
    const newTasks = tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    )
    setTasks(newTasks)
    localStorage.setItem('focusflow-tasks', JSON.stringify(newTasks))
  }

  const deleteTask = (id) => {
    const newTasks = tasks.filter(task => task.id !== id)
    setTasks(newTasks)
    localStorage.setItem('focusflow-tasks', JSON.stringify(newTasks))
  }

  const startTimer = () => setIsRunning(true)
  const pauseTimer = () => setIsRunning(false)
  const resetTimer = () => {
    setIsRunning(false)
    setTimer(25 * 60)
  }

  const setTimerMode = (minutes) => {
    setIsRunning(false)
    setTimer(minutes * 60)
  }

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  const getFocusScore = () => {
    const completed = tasks.filter(t => t.completed).length
    const total = tasks.length || 1
    return Math.round((completed / total) * 100)
  }

  const getAISuggestion = () => {
    const hour = new Date().getHours()
    const pendingTasks = tasks.filter(t => !t.completed).length
    
    if (hour < 12 && pendingTasks > 3) {
      return "¡Buenos días! Te recomiendo enfocarte en las 3 tareas más importantes antes del almuerzo."
    } else if (pendingTasks === 0) {
      return "¡Excelente! Has completado todas tus tareas. Considera planificar el día de mañana."
    } else {
      return "Basado en tus patrones, te sugiero trabajar en bloques de 25 minutos con descansos de 5 minutos."
    }
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      addTask()
    }
  }

  return (
    <div className="container">
      <header className="header">
        <div className="logo">
          <i className="fas fa-brain"></i>
          <h1>FocusFlow <span className="ai-text">AI</span></h1>
        </div>
        <div className="user-stats">
          <div className="stat">
            <span className="stat-value">{getFocusScore()}%</span>
            <span className="stat-label">Enfoque</span>
          </div>
          <div className="stat">
            <span className="stat-value">{tasks.filter(t => t.completed).length}</span>
            <span className="stat-label">Completadas</span>
          </div>
        </div>
      </header>

      <main className="main-content">
        <div className="ai-recommendation">
          <div className="recommendation-header">
            <i className="fas fa-robot"></i>
            <h3>Recomendación de IA</h3>
          </div>
          <p>{getAISuggestion()}</p>
        </div>

        <div className="dashboard-grid">
          {/* Gestor de Tareas */}
          <div className="card task-manager">
            <h3><i className="fas fa-tasks"></i> Gestor de Tareas</h3>
            <div className="task-input">
              <input
                type="text"
                value={taskInput}
                onChange={(e) => setTaskInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Agregar nueva tarea..."
              />
              <button onClick={addTask}>
                <i className="fas fa-plus"></i>
              </button>
            </div>
            <div className="task-list">
              {tasks.map((task) => (
                <div key={task.id} className={`task-item ${task.completed ? 'completed' : ''}`}>
                  <label className="checkbox">
                    <input
                      type="checkbox"
                      checked={task.completed}
                      onChange={() => toggleTask(task.id)}
                    />
                    <span className="checkmark"></span>
                  </label>
                  <span className="task-text">{task.text}</span>
                  <button 
                    className="delete-task"
                    onClick={() => deleteTask(task.id)}
                  >
                    <i className="fas fa-trash"></i>
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Timer de Enfoque */}
          <div className="card focus-timer">
            <h3><i className="fas fa-clock"></i> Tiempo de Enfoque</h3>
            <div className="timer-display">
              <div className="time">{formatTime(timer)}</div>
              <div className="timer-controls">
                <button 
                  className="btn-primary" 
                  onClick={startTimer}
                  disabled={isRunning}
                >
                  Iniciar
                </button>
                <button 
                  className="btn-secondary" 
                  onClick={pauseTimer}
                  disabled={!isRunning}
                >
                  Pausar
                </button>
                <button className="btn-outline" onClick={resetTimer}>
                  Reiniciar
                </button>
              </div>
            </div>
            <div className="timer-modes">
              <button className="mode-btn" onClick={() => setTimerMode(25)}>
                Enfoque (25m)
              </button>
              <button className="mode-btn" onClick={() => setTimerMode(5)}>
                Descanso Corto (5m)
              </button>
              <button className="mode-btn" onClick={() => setTimerMode(15)}>
                Descanso Largo (15m)
              </button>
            </div>
          </div>

          {/* Bloqueador de Distracciones */}
          <div className="card distraction-blocker">
            <h3><i className="fas fa-shield-alt"></i> Bloqueador de Distracciones</h3>
            <div className="blocker-list">
              <div className="blocker-item">
                <span>Redes Sociales</span>
                <label className="switch">
                  <input 
                    type="checkbox" 
                    checked={focusMode}
                    onChange={(e) => setFocusMode(e.target.checked)}
                  />
                  <span className="slider"></span>
                </label>
              </div>
              <div className="blocker-item">
                <span>Notificaciones</span>
                <label className="switch">
                  <input type="checkbox" />
                  <span className="slider"></span>
                </label>
              </div>
            </div>
            <button className={`btn-primary ${focusMode ? 'active' : ''}`}>
              <i className="fas fa-play"></i> 
              {focusMode ? 'Modo Enfoque Activado' : 'Activar Modo Enfoque'}
            </button>
          </div>

          {/* Análisis de Productividad */}
          <div className="card analytics">
            <h3><i className="fas fa-chart-line"></i> Análisis de Productividad</h3>
            <div className="analytics-content">
              <div className="metric">
                <span className="metric-value">2.5h</span>
                <span className="metric-label">Horas esta semana</span>
              </div>
              <div className="metric">
                <span className="metric-value">{getFocusScore()}%</span>
                <span className="metric-label">Tasa de completación</span>
              </div>
              <div className="chart-placeholder">
                <i className="fas fa-chart-bar"></i>
                <p>Gráfico de productividad</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default App