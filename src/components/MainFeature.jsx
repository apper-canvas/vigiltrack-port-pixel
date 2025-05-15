import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'react-toastify';
import getIcon from '../utils/iconUtils';

// Icons
const PlusIcon = getIcon('Plus');
const SearchIcon = getIcon('Search');
const FilterIcon = getIcon('Filter');
const CameraIcon = getIcon('Camera');
const CheckCircleIcon = getIcon('CheckCircle');
const AlertCircleIcon = getIcon('AlertCircle');
const ClockIcon = getIcon('Clock');
const XIcon = getIcon('X');
const SaveIcon = getIcon('Save');
const TrashIcon = getIcon('Trash');
const EditIcon = getIcon('Edit');

const MainFeature = ({ onAddEquipment }) => {
  // State for equipment list
  const [equipment, setEquipment] = useState([
    { 
      id: '001', 
      model: 'DS-2CD2T85G1-I8', 
      serialNumber: 'B7425FC8',
      type: 'Dome Camera',
      manufacturer: 'Hikvision',
      purchaseDate: '2023-04-15',
      status: 'active',
      location: 'Main Entrance'
    },
    { 
      id: '002', 
      model: 'DS-2CD2386G2-ISU/SL', 
      serialNumber: 'F9237A12',
      type: 'Bullet Camera',
      manufacturer: 'Hikvision',
      purchaseDate: '2023-02-10',
      status: 'maintenance',
      location: 'Parking Lot A'
    },
    { 
      id: '003', 
      model: 'NVR5216-16P-I', 
      serialNumber: 'C5189D34',
      type: 'Network Video Recorder',
      manufacturer: 'Dahua',
      purchaseDate: '2022-11-28',
      status: 'active',
      location: 'Security Room'
    },
    { 
      id: '004', 
      model: 'IPC-HDBW5442E-ZE', 
      serialNumber: 'D8123E56',
      type: 'Dome Camera',
      manufacturer: 'Dahua',
      purchaseDate: '2023-01-05',
      status: 'decommissioned',
      location: 'Warehouse'
    },
  ]);
  
  // State for form
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [formData, setFormData] = useState({
    id: '',
    model: '',
    serialNumber: '',
    type: '',
    manufacturer: '',
    purchaseDate: '',
    status: 'active',
    location: ''
  });
  
  // State for editing
  const [editMode, setEditMode] = useState(false);
  const [editId, setEditId] = useState(null);
  
  // State for filtering
  const [filterStatus, setFilterStatus] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  
  // Filtered equipment list
  const filteredEquipment = equipment.filter(item => {
    const matchesStatus = filterStatus === 'all' || item.status === filterStatus;
    const matchesSearch = 
      item.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.serialNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.manufacturer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.location.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesStatus && matchesSearch;
  });
  
  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };
  
  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.model || !formData.serialNumber || !formData.type || !formData.manufacturer) {
      toast.error("Please fill in all required fields");
      return;
    }
    
    if (editMode) {
      // Update existing equipment
      const updatedEquipment = equipment.map(item => 
        item.id === editId ? { ...formData, id: editId } : item
      );
      setEquipment(updatedEquipment);
      toast.success(`Equipment ${formData.model} has been updated`);
    } else {
      // Add new equipment
      const newEquipment = {
        ...formData,
        id: Date.now().toString().slice(-6)
      };
      setEquipment([...equipment, newEquipment]);
      if (onAddEquipment) onAddEquipment(newEquipment);
      toast.success(`New equipment ${newEquipment.model} has been added`);
    }
    
    // Reset form
    resetForm();
  };
  
  // Delete equipment
  const handleDelete = (id) => {
    const itemToDelete = equipment.find(item => item.id === id);
    setEquipment(equipment.filter(item => item.id !== id));
    toast.success(`Equipment ${itemToDelete.model} has been removed`);
  };
  
  // Edit equipment
  const handleEdit = (id) => {
    const itemToEdit = equipment.find(item => item.id === id);
    setFormData(itemToEdit);
    setEditMode(true);
    setEditId(id);
    setIsFormOpen(true);
  };
  
  // Reset form
  const resetForm = () => {
    setFormData({
      id: '',
      model: '',
      serialNumber: '',
      type: '',
      manufacturer: '',
      purchaseDate: '',
      status: 'active',
      location: ''
    });
    setEditMode(false);
    setEditId(null);
    setIsFormOpen(false);
  };

  // Status badge component
  const StatusBadge = ({ status }) => {
    const statusConfig = {
      active: {
        bg: "bg-green-100 dark:bg-green-900/30",
        text: "text-green-700 dark:text-green-400",
        icon: CheckCircleIcon
      },
      maintenance: {
        bg: "bg-amber-100 dark:bg-amber-900/30",
        text: "text-amber-700 dark:text-amber-400",
        icon: ClockIcon
      },
      decommissioned: {
        bg: "bg-red-100 dark:bg-red-900/30",
        text: "text-red-700 dark:text-red-400",
        icon: AlertCircleIcon
      }
    };
    
    const config = statusConfig[status] || statusConfig.active;
    const Icon = config.icon;
    
    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${config.bg} ${config.text}`}>
        <Icon className="w-3 h-3 mr-1" />
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h2 className="text-xl font-bold text-surface-800 dark:text-white flex items-center">
          <CameraIcon className="mr-2 h-5 w-5 text-primary" />
          Equipment Inventory
        </h2>
        
        <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
          <div className="relative flex-grow">
            <input
              type="text"
              placeholder="Search equipment..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="input-field pl-10 py-2"
            />
            <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-surface-400" />
          </div>
          
          <div className="flex items-center gap-3">
            <div className="relative">
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="input-field appearance-none pr-10 py-2"
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="maintenance">Maintenance</option>
                <option value="decommissioned">Decommissioned</option>
              </select>
              <FilterIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-surface-400 pointer-events-none" />
            </div>
            
            <button
              onClick={() => setIsFormOpen(true)}
              className="btn btn-primary flex items-center gap-1"
            >
              <PlusIcon className="h-4 w-4" />
              <span className="hidden sm:inline">Add Equipment</span>
              <span className="sm:hidden">Add</span>
            </button>
          </div>
        </div>
      </div>
      
      {/* Equipment List */}
      <div className="relative overflow-x-auto rounded-xl border border-surface-200 dark:border-surface-700">
        <table className="w-full text-sm text-left">
          <thead className="text-xs uppercase bg-surface-100 dark:bg-surface-800 text-surface-700 dark:text-surface-300">
            <tr>
              <th scope="col" className="px-4 py-3">ID</th>
              <th scope="col" className="px-4 py-3">Model</th>
              <th scope="col" className="px-4 py-3 hidden md:table-cell">Serial Number</th>
              <th scope="col" className="px-4 py-3 hidden lg:table-cell">Type</th>
              <th scope="col" className="px-4 py-3 hidden lg:table-cell">Manufacturer</th>
              <th scope="col" className="px-4 py-3">Status</th>
              <th scope="col" className="px-4 py-3 hidden md:table-cell">Location</th>
              <th scope="col" className="px-4 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredEquipment.length > 0 ? (
              filteredEquipment.map((item) => (
                <motion.tr 
                  key={item.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="bg-white dark:bg-surface-800 border-b border-surface-200 dark:border-surface-700 hover:bg-surface-50 dark:hover:bg-surface-700"
                >
                  <td className="px-4 py-3 font-medium">{item.id}</td>
                  <td className="px-4 py-3 font-medium text-surface-900 dark:text-white">{item.model}</td>
                  <td className="px-4 py-3 hidden md:table-cell">{item.serialNumber}</td>
                  <td className="px-4 py-3 hidden lg:table-cell">{item.type}</td>
                  <td className="px-4 py-3 hidden lg:table-cell">{item.manufacturer}</td>
                  <td className="px-4 py-3">
                    <StatusBadge status={item.status} />
                  </td>
                  <td className="px-4 py-3 hidden md:table-cell">{item.location}</td>
                  <td className="px-4 py-3 text-right space-x-1">
                    <button
                      onClick={() => handleEdit(item.id)}
                      className="p-1.5 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/30 rounded-lg"
                      aria-label="Edit"
                    >
                      <EditIcon className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="p-1.5 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-lg"
                      aria-label="Delete"
                    >
                      <TrashIcon className="h-4 w-4" />
                    </button>
                  </td>
                </motion.tr>
              ))
            ) : (
              <tr className="bg-white dark:bg-surface-800">
                <td colSpan="8" className="px-4 py-8 text-center text-surface-500">
                  No equipment found matching your criteria. Try adjusting your search or filter.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      
      {/* Add/Edit Equipment Modal */}
      <AnimatePresence>
        {isFormOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-surface-900/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white dark:bg-surface-800 rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            >
              <div className="flex justify-between items-center p-5 border-b border-surface-200 dark:border-surface-700">
                <h3 className="text-lg font-bold text-surface-800 dark:text-white">
                  {editMode ? 'Edit Equipment' : 'Add New Equipment'}
                </h3>
                <button
                  onClick={resetForm}
                  className="p-1.5 rounded-lg hover:bg-surface-100 dark:hover:bg-surface-700 text-surface-500"
                  aria-label="Close"
                >
                  <XIcon className="h-5 w-5" />
                </button>
              </div>
              
              <form onSubmit={handleSubmit} className="p-5 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="model" className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1">
                      Model *
                    </label>
                    <input
                      type="text"
                      id="model"
                      name="model"
                      value={formData.model}
                      onChange={handleChange}
                      className="input-field"
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="serialNumber" className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1">
                      Serial Number *
                    </label>
                    <input
                      type="text"
                      id="serialNumber"
                      name="serialNumber"
                      value={formData.serialNumber}
                      onChange={handleChange}
                      className="input-field"
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="type" className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1">
                      Type *
                    </label>
                    <select
                      id="type"
                      name="type"
                      value={formData.type}
                      onChange={handleChange}
                      className="input-field"
                      required
                    >
                      <option value="">Select type</option>
                      <option value="Dome Camera">Dome Camera</option>
                      <option value="Bullet Camera">Bullet Camera</option>
                      <option value="PTZ Camera">PTZ Camera</option>
                      <option value="Network Video Recorder">Network Video Recorder</option>
                      <option value="Digital Video Recorder">Digital Video Recorder</option>
                      <option value="Storage Device">Storage Device</option>
                      <option value="Monitor">Monitor</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                  
                  <div>
                    <label htmlFor="manufacturer" className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1">
                      Manufacturer *
                    </label>
                    <select
                      id="manufacturer"
                      name="manufacturer"
                      value={formData.manufacturer}
                      onChange={handleChange}
                      className="input-field"
                      required
                    >
                      <option value="">Select manufacturer</option>
                      <option value="Hikvision">Hikvision</option>
                      <option value="Dahua">Dahua</option>
                      <option value="Axis">Axis</option>
                      <option value="Bosch">Bosch</option>
                      <option value="Hanwha">Hanwha</option>
                      <option value="Uniview">Uniview</option>
                      <option value="Vivotek">Vivotek</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                  
                  <div>
                    <label htmlFor="purchaseDate" className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1">
                      Purchase Date
                    </label>
                    <input
                      type="date"
                      id="purchaseDate"
                      name="purchaseDate"
                      value={formData.purchaseDate}
                      onChange={handleChange}
                      className="input-field"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="status" className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1">
                      Status
                    </label>
                    <select
                      id="status"
                      name="status"
                      value={formData.status}
                      onChange={handleChange}
                      className="input-field"
                    >
                      <option value="active">Active</option>
                      <option value="maintenance">Maintenance</option>
                      <option value="decommissioned">Decommissioned</option>
                    </select>
                  </div>
                  
                  <div className="md:col-span-2">
                    <label htmlFor="location" className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1">
                      Location
                    </label>
                    <input
                      type="text"
                      id="location"
                      name="location"
                      value={formData.location}
                      onChange={handleChange}
                      className="input-field"
                      placeholder="Where is this equipment installed?"
                    />
                  </div>
                </div>
                
                <div className="flex justify-end gap-3 pt-4 border-t border-surface-200 dark:border-surface-700">
                  <button
                    type="button"
                    onClick={resetForm}
                    className="btn btn-outline"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="btn btn-primary flex items-center gap-1"
                  >
                    <SaveIcon className="h-4 w-4" />
                    {editMode ? 'Update Equipment' : 'Save Equipment'}
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MainFeature;