"use client";
import { useState } from 'react';
import { db } from '@/lib/firebase';
import { collection, addDoc } from 'firebase/firestore';

export default function Invitacion() {
  const [nombre, setNombre] = useState('');
  const [numAcompañantes, setNumAcompañantes] = useState(0);
  const [nombresAcompañantes, setNombresAcompañantes] = useState([]);
  const [enviado, setEnviado] = useState(false);

  const handleAcompañantesChange = (val) => {
    const count = parseInt(val);
    setNumAcompañantes(count);
    setNombresAcompañantes(new Array(count).fill(""));
  };

  const enviarConfirmacion = async (e) => {
    e.preventDefault();
    await addDoc(collection(db, "confirmaciones"), {
      invitadoPrincipal: nombre,
      acompañantes: nombresAcompañantes,
      totalPersonas: numAcompañantes + 1,
      fecha: new Date().toLocaleString()
    });
    setEnviado(true);
  };

  if (enviado) return (
    <div className="h-screen flex items-center justify-center bg-pink-50 text-center p-6">
      <div className="bg-white p-8 rounded-2xl shadow-xl">
        <h2 className="text-3xl font-serif text-pink-600 mb-4">¡Gracias por confirmar!</h2>
        <p className="text-gray-600">Nos vemos en nuestro gran día. ✨</p>
      </div>
    </div>
  );

  return (
    <main className="min-h-screen bg-pink-50 p-6 font-serif">
      <div className="max-w-md mx-auto bg-white rounded-3xl shadow-2xl overflow-hidden mt-10 p-8">
        <h1 className="text-4xl text-center text-pink-700 mb-2">Ana & Carlos</h1>
        <p className="text-center text-gray-500 mb-8 italic">¡Te esperamos para celebrar!</p>
        
        <form onSubmit={enviarConfirmacion} className="space-y-4">
          <div>
            <label className="block text-gray-700">Tu nombre completo</label>
            <input required className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-pink-300 outline-none" 
                   onChange={(e) => setNombre(e.target.value)} />
          </div>

          <div>
            <label className="block text-gray-700">Número de acompañantes</label>
            <select className="w-full border p-3 rounded-lg" onChange={(e) => handleAcompañantesChange(e.target.value)}>
              {[0,1,2,3,4].map(n => <option key={n} value={n}>{n}</option>)}
            </select>
          </div>

          {nombresAcompañantes.map((_, i) => (
            <input key={i} required placeholder={`Nombre acompañante ${i+1}`} 
                   className="w-full border p-3 rounded-lg animate-fade-in"
                   onChange={(e) => {
                     const nuevos = [...nombresAcompañantes];
                     nuevos[i] = e.target.value;
                     setNombresAcompañantes(nuevos);
                   }} />
          ))}

          <button className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-4 rounded-xl transition-all shadow-lg">
            Confirmar Asistencia
          </button>
        </form>
      </div>
    </main>
  );
}
