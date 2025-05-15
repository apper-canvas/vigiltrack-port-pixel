import { useState } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import getIcon from '../utils/iconUtils';

// Components
import MainFeature from '../components/MainFeature';

// Icons
const CameraIcon = getIcon('Camera');
const CheckCircleIcon = getIcon('CheckCircle');
const ClockIcon = getIcon('Clock');
const BarChart2Icon = getIcon('BarChart2');

const Home = () => {
  const [totalEquipment, setTotalEquipment] = useState(87);
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0,
      opacity: 1,
      transition: { type: 'spring', stiffness: 100 }
    }
  };

  const handleNewEquipment = (equipment) => {
    setTotalEquipment(prev => prev + 1);
    toast.success(`${equipment.model} has been added to inventory`);
  };
  
  // Dashboard summary cards data
  const summaryData = [
    {
      title: "Total Equipment",
      value: totalEquipment,
      icon: CameraIcon,
      color: "text-primary-dark",
      bgColor: "bg-primary-light/10"
    },
    {
      title: "Available",
      value: Math.floor(totalEquipment * 0.78),
      icon: CheckCircleIcon,
      color: "text-green-600",
      bgColor: "bg-green-100 dark:bg-green-900/20"
    },
    {
      title: "In Maintenance",
      value: Math.floor(totalEquipment * 0.12),
      icon: ClockIcon,
      color: "text-amber-500",
      bgColor: "bg-amber-100 dark:bg-amber-900/20"
    },
    {
      title: "Decommissioned",
      value: Math.floor(totalEquipment * 0.1),
      icon: BarChart2Icon,
      color: "text-red-500",
      bgColor: "bg-red-100 dark:bg-red-900/20"
    }
  ];

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="space-y-8"
    >
      <section>
        <div className="mb-6">
          <h1 className="text-2xl md:text-3xl font-bold text-surface-800 dark:text-white">
            CCTV Inventory Dashboard
          </h1>
          <p className="text-surface-600 dark:text-surface-400 mt-2">
            Track, manage, and maintain your CCTV equipment inventory
          </p>
        </div>
        
        {/* Dashboard Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {summaryData.map((item, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="card p-5 flex items-center"
            >
              <div className={`${item.bgColor} p-3 rounded-xl mr-4`}>
                <item.icon className={`h-6 w-6 ${item.color}`} />
              </div>
              <div>
                <h3 className="text-sm font-medium text-surface-500 dark:text-surface-400">
                  {item.title}
                </h3>
                <p className="text-2xl font-bold text-surface-800 dark:text-white">
                  {item.value}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Main Feature */}
      <section>
        <MainFeature onAddEquipment={handleNewEquipment} />
      </section>
    </motion.div>
  );
};

export default Home;