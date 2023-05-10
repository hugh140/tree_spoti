import './index.css'
const params = new URLSearchParams(window.location.search)

function App() {
  return (
    <main className='container mx-auto'>
      <h1 className='text-5xl text-center pt-5'>{params.get('code')} Nombre Ejemplo HHAHAHA</h1>
    </main>
  )
}

export default App
