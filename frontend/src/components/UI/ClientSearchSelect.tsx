import { useState, useEffect } from 'preact/hooks';
import { Search, User, X } from 'lucide-react';
import { Client } from '../../types';
import { useClients } from '../../hooks/useClients';

interface ClientSearchSelectProps {
  selectedClientId: number;
  onClientSelect: (clientId: number) => void;
  placeholder?: string;
  error?: string;
}

export default function ClientSearchSelect({
  selectedClientId,
  onClientSelect,
  placeholder = 'Buscar cliente...',
  error
}: ClientSearchSelectProps) {
  const { clients } = useClients();
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  
  const selectedClient = clients.find(c => c.id === selectedClientId);
  
  const filteredClients = clients.filter(client =>
    `${client.first_name} ${client.last_name}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.dni.includes(searchTerm) ||
    client.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleClientSelect = (client: Client) => {
    onClientSelect(client.id!);
    setIsOpen(false);
    setSearchTerm('');
  };

  const handleClear = () => {
    onClientSelect(0);
    setSearchTerm('');
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      if (!target.closest('.client-search-container')) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="client-search-container relative">
      <div className={`relative border rounded-lg ${error ? 'border-red-500' : 'border-gray-300'}`}>
        <div className="flex items-center">
          <Search className="absolute left-3 w-4 h-4 text-gray-400" />
          <input
            type="text"
            value={selectedClient ? `${selectedClient.first_name} ${selectedClient.last_name} - ${selectedClient.dni}` : searchTerm}
            onChange={(e) => {
              setSearchTerm((e.target as HTMLInputElement).value);
              setIsOpen(true);
              if (selectedClient) {
                onClientSelect(0);
              }
            }}
            onFocus={() => setIsOpen(true)}
            placeholder={placeholder}
            className="w-full pl-10 pr-10 py-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
          />
          {selectedClient && (
            <button
              type="button"
              onClick={handleClear}
              className="absolute right-3 text-gray-400 hover:text-gray-600"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {isOpen && (
        <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto">
          {filteredClients.length > 0 ? (
            filteredClients.map((client) => (
              <button
                key={client.id}
                type="button"
                onClick={() => handleClientSelect(client)}
                className="w-full px-4 py-3 text-left hover:bg-gray-50 flex items-center space-x-3 border-b border-gray-100 last:border-b-0"
              >
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <User className="w-4 h-4 text-blue-600" />
                </div>
                <div className="flex-1">
                  <p className="font-medium text-gray-900">
                    {client.first_name} {client.last_name}
                  </p>
                  <p className="text-sm text-gray-500">
                    DNI: {client.dni} • {client.email}
                  </p>
                </div>
              </button>
            ))
          ) : (
            <div className="px-4 py-3 text-gray-500 text-center">
              No se encontraron clientes
            </div>
          )}
        </div>
      )}

      {error && (
        <p className="text-sm text-red-600 mt-1">{error}</p>
      )}
    </div>
  );
}