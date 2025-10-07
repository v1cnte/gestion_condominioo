function Condominios() {
  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Condominios</h1>
        <p className="text-gray-600">Gestión de propiedades y edificios</p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Lista de Condominios</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="border border-gray-200 rounded-lg p-4">
            <h3 className="font-semibold text-gray-800">Edificio Central</h3>
            <p className="text-gray-600 text-sm">128 unidades</p>
            <p className="text-gray-600 text-sm">Construido en 2018</p>
          </div>
          <div className="border border-gray-200 rounded-lg p-4">
            <h3 className="font-semibold text-gray-800">Torre Norte</h3>
            <p className="text-gray-600 text-sm">96 unidades</p>
            <p className="text-gray-600 text-sm">Construido en 2020</p>
          </div>
          <div className="border border-gray-200 rounded-lg p-4">
            <h3 className="font-semibold text-gray-800">Torre Sur</h3>
            <p className="text-gray-600 text-sm">84 unidades</p>
            <p className="text-gray-600 text-sm">Construido en 2019</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Condominios;