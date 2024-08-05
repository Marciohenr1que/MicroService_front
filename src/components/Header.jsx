export default function Header({ user, onLogout }) {
  return (
    <header className="bg-blue-500 p-4 text-white">
      <div className="container mx-auto flex justify-between items-center">
        <span className="font-semibold text-lg">
          {user ? `Olá, ${user.name}` : "Bem-vindo"}
        </span>
        <button
          onClick={onLogout}
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md"
        >
          Sair
        </button>
      </div>
    </header>
  );
}
