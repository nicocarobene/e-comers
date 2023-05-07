import Filter from './Filter'

export default function Header () {
  return (
        <header style={{
          maxWidth: '600px',
          margin: 'auto'
        }}>
            <h1>Shopping Card 🛒</h1>
            <Filter/>
        </header>
  )
}
