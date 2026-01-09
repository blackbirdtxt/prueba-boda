"use client";
import { useEffect, useState } from 'react';
import { db } from '@/lib/firebase';
import { collection, getDocs } from 'firebase/firestore';
import * as XLSX from 'xlsx';

export default function AdminPanel() {
  const [invitados, setInvitados] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const querySnapshot = await getDocs(collection(db, "confirmaciones"));
      const data = querySnapshot.docs.map(doc => doc.data());
      setInvitados(data);
    };
    fetchData();
  }, []);

  const exportarExcel = () => {
    const ws = XLSX.utils.json_to_sheet(invitados.map(inv => ({
      Invitado: inv.invitadoPrincipal,
      Acompañantes: inv.acompañantes.join(", "),
      Total: inv.totalPersonas,
      Fecha: inv.fecha
    })));
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Invitados");
    XLSX.writeFile(wb, "Lista_Boda.xlsx");
  };

  const totalConfirmados = invitados.reduce((acc, curr) => acc + curr.totalPersonas, 0);

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <div className="max-w-5xl mx-auto bg-white p-8 rounded-xl shadow-md">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold">Panel de Control - Ana & Carlos</h1>
          <button onClick={exportarExcel} className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700">
            📥 Descargar Excel
          </button>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-8">
          <div className="bg-pink-100 p-4 rounded-lg">
            <p className="text-pink-800 text-sm">Total Invitados</p>
            <p className="text-3xl font-bold">{totalConfirmados}</p>
          </div>
          <div className="bg-blue-100 p-4 rounded-lg">
            <p className="text-blue-800 text-sm">Mesas Sugeridas (10 pers.)</p>
            <p className="text-3xl font-bold">{Math.ceil(totalConfirmados / 10)}</p>
          </div>
        </div>

        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b">
              <th className="py-2">Invitado Principal</th>
              <th className="py-2">Acompañantes</th>
              <th className="py-2">Total</th>
            </tr>
          </thead>
          <tbody>
            {invitados.map((inv, i) => (
              <tr key={i} className="border-b hover:bg-gray-50">
                <td className="py-3">{inv.invitadoPrincipal}</td>
                <td className="py-3 text-sm text-gray-600">{inv.acompañantes.join(", ")}</td>
                <td className="py-3">{inv.totalPersonas}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}